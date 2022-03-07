const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/apiFeatures');
const path = require('path');

exports.getAll = Model => catchAsync(async (req, res, next) => {
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

  // Small hack
  let filter = {};
  if (req.params.tourId) filter = {tour: req.params.tourId};

  const features = new APIFeatures(Model.find(filter), req.query).filter().sort().fields().pagination();
  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    time: req.time,
    data: {
      data: doc,
    },
  });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);

  if (popOptions) {
    query = query.populate(popOptions);
  }

  const doc = await query;

  // const tour = await Tour.findById(req.params.id).populate({
  //   path: 'guides',
  //   select: '-__v',
  // }).populate('reviews');

  if (!doc) {
    return next(new AppError('Tour Not Found', 404));
  }

  res.status(200).json({
    data: {
      data: doc,
    },
  });
});

exports.createOne = Model => catchAsync(async (req, res) => {
  const newDoc = await Model.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      createdDoc: newDoc,
    },
  });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No Document found with that ID', 404));
  }

  res.status(200).json({
    data: {
      updatedDocument: doc,
    },
  });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) return next(new AppError('No Document with that ID', 404));

  res.status(204).json({
    status: 'Successfully Deleted',
    data: {
      deletedDocument: doc,
    },
  });
});