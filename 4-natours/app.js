const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

//Custom middleware
app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const tourRoute = require(`${__dirname}/routes/tourRoutes`);
const userRoute = require(`${__dirname}/routes/userRoutes`);

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/tours', userRoute);

module.exports = app;