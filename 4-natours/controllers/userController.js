const Users = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (filter, ...elements) => {
  const newObj = {};
  Object.keys(filter).forEach(el => {
    if (elements.includes(el)) {
      newObj[el] = filter[el];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await Users.find();

  res.status(200).send({
    message: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = {id: newId, ...req.body};
  users.push(newUser);

  fs.writeFile(`./../dev-data/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        users: users,
      },
    });
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user update password
  if (req.body.password || req.body.passwordConfirm) {
    console.log(req.body);
    return next(new AppError('This route is not for password update', 400));
  }
  // 2. update user document
  const updatedUser = await Users.findByIdAndUpdate(req.user.id, filterObj(req.body, 'name', 'email'), {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user.id, {active: false});

  res.status(204).json({
    status: 'Success',
    message: 'Your account has switched to INACTIVE',
  });
});

exports.getUser = (req, res) => {
  console.log(req.params);
  if (req.params.id * 1 < users.length) {
    const user = users.find(el => el.id === req.params.id * 1);
    res.status(200).json({
      data: {
        user,
      },
    });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.updateUser = (req, res) => {
  if (req.params.id * 1 < users.length) {
    res.status(200).json({
      status: 'success',
      message: 'Updated!!!',
    });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.deleteUser = (req, res) => {
  res.status(204).json({
    message: 'Deleted',
    data: null,
  });
};