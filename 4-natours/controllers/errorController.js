module.exports = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Error';

  res.status(err.status).json({
    status: 'error',
    message: 'awdawdawdawd',
  });
};