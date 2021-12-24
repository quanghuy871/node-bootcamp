const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`, 'utf-8'));

const isEmpty = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
};

exports.checkValidId = (req, res, next) => {
  if (req.params.id * 1 < tours.length) {
    res.status(200).json({
      status: 'success',
      message: 'Updated!!!',
    });
  } else {
    return res.status(404).send('Not Found');
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(404).json({
      message: 'Bad request',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.time,
    data: {
      tours: tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {id: newId, ...req.body};
  tours.push(newTour);

  fs.writeFile(`./../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tours: tours,
      },
    });
  });
};

exports.getTour = (req, res) => {
  if (req.params.id * 1 < tours.length) {
    const tour = tours.find(el => el.id === req.params.id * 1);
    res.status(200).json({
      data: {
        tour,
      },
    });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 < tours.length) {
    res.status(200).json({
      status: 'success',
      message: 'Updated!!!',
    });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    message: 'Deleted',
    data: null,
  });
};