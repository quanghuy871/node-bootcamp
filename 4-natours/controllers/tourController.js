const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllTours = async (req, res) => {
  try {
    // 3. SORT
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // }
    // // 4. FIELDS SELECT
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }
    // // 5. PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    //
    // query = query.skip(skip).limit(limit);
    //
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) {
    //     throw new Error('This page is not exist');
    //   }
    // }
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().fields().pagination();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
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
