const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());

//Custom middleware
app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Error',
});

app.use(helmet());
app.use('/api', limiter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
