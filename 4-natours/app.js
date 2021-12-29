const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRoute = require(`${__dirname}/routes/tourRoutes`);
const userRoute = require(`${__dirname}/routes/userRoutes`);
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

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/tours', userRoute);

app.all('*', (req, res, next) => {
  next(new AppError('Not Found', 404));
});

app.use(globalErrorHandler);

module.exports = app;