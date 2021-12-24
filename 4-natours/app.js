const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

//Custom middleware
app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

const tourRoute = require(`${__dirname}/routes/tourRoutes`);
const userRoute = require(`${__dirname}/routes/userRoutes`);

app.use('/api/v1', tourRoute);
app.use('/api/v1', userRoute);

module.exports = app;