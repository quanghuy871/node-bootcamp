const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const deleteReview = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = {tour: req.params.tourId};

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'Success',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      review,
    },
  });
});

exports.deleteReview = deleteReview.deleteOne(Review);