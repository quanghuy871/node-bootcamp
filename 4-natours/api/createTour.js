const fs = require('fs');
const tours = require('./helper');

module.exports = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {id: newId, ...req.body};
  tours.push(newTour);

  fs.writeFile(`././dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tours: tours,
      },
    });
  });
};