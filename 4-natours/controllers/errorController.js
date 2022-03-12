const AppError = require('./../utils/appError');

// Handle Cast Error
const handleCastError = (err) => {
  const message = `Invalid id: ${err.value}`;

  return new AppError(message, 400);
};

// Handle duplicate fields Error
const handleDuplicateFieldsError = (err) => {
  const message = `Duplicate name: ${err.keyValue.email}`;

  return new AppError(message, 400);
};

// Handle validation Error
const handleValidationError = (err) => {
  const message = Object.values(err.errors).map(el => el.message);

  return new AppError(message.join('. '), 400);
};

const handleJWTError = (err) => {
  const message = `Internal Server Error or missing JWT`;

  return new AppError(message, 500);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = {...err};
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsError(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTError(error);

    sendErrorProd(error, res);
  }
};
