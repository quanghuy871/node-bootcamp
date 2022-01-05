const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'Success',
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);

  res.status(204).json({
    status: 'Success',
    data: {
      review,
    },
  });
});