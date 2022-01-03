const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const sendJWT = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  sendJWT(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) return next(new AppError('Please provide email or password', 404));

  const user = await User.findOne({email}).select('+password');

  if (!user || !await user.correctPassword(password, user.password)) {
    return next(new AppError('Incorrect email or password', 401));
  }

  sendJWT(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Get the token from header
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!', 401));
  }

  // 2. Verification token => decode to an object
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exits
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(new AppError('The user belongs to this token no longer exist', 401));
  }

  // 4. Check for the token changed after the token was issue
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(new AppError('Please login again', 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You don\'t have permission to perform this action', 403));
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on Posted email
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return next(new AppError('There is no user with this email', 400));
  }

  // 2. Generate the ramdom reset token
  const resetToken = user.resetPasswordToken();
  await user.save({validateBeforeSave: false});

  // 3. Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? access this URL to reset your password: ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject: 'Valid for 10 mins',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Please check your email',
    });
  } catch (err) {
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
    await user.save({validateBeforeSave: false});
    console.log(err);

    return next(new AppError('Your token has been expired', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await Users.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});

  // 2. if token has not expires, and there is a user, set new password
  if (!user) {
    return next(new AppError('The token has expired, please try again later', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3. Update changePasswordAt property for the user
  // 4. log the user in, send JWT
  sendJWT(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get the user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2. Check if Posted password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is not correct', 401));
  }

  // 3. if so, change the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Log user in, send JWT
  sendJWT(user, 200, res);
});
