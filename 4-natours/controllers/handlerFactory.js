const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/AppError');

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