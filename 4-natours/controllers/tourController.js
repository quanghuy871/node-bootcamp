const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      time: req.time,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAIL',
      message: 'Failed to load DATA',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.update({_id: req.params.id}, req.body, {
      runValidators: true,
    });
    res.status(200).json({
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.remove({_id: req.params.id});
    const tours = await Tour.find();

    res.status(204).json({
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
