const tours = require('./helper');

module.exports = (req, res) => {
  if (req.params.id * 1 < tours.length) {
    res.status(200).json({
      status: 'success',
      message: 'Updated!!!',
    });
  } else {
    res.status(404).send('Not Found');
  }
};