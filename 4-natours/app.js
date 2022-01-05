const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);
const reviewRouter = require(`${__dirname}/routes/reviewRoutes`);
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

// Data sanitize against NoSQL injection
app.use(mongoSanitize());

// Data sanitize against XSS injection "Cross-site scripting"
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(helmet());
app.use('/api', limiter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
