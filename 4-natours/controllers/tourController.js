const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const deleteTour = require('./handlerFactory');

exports.getAllTours = catchAsync(async (req, res, next) => {
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
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    data: {
      newTour,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: 'guides',
    select: '-__v',
  }).populate('reviews');

  if (!tour) {
    return next(new AppError('Tour Not Found', 404));
  }

  res.status(200).json({
    data: {
      tour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.update({_id: req.params.id}, req.body, {
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('Tour Not Found', 404));
  }

  res.status(200).json({
    data: {
      tour,
    },
  });
});

exports.deleteTour = deleteTour.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.deleteOne({_id: req.params.id});
//
//   if (!tour) {
//     return next(new AppError('Tour Not Found', 404));
//   }
//
//   res.status(204).json({
//     status: 'Success',
//   });
// });