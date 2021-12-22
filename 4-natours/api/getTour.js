const tours = require('./helper');

module.exports = (req, res) => {
  if (req.params.id * 1 < tours.length) {
    const tour = tours.find(el => el.id === req.params.id * 1);
    res.status(200).json({
      data: tour,
    });
  } else {
    res.status(404).send('Not Found');
  }
};