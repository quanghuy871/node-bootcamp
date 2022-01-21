const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
  review: {
    type: String,
    require: [true, 'The review input is empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  createdAt: {
    type: Date,
  },
  tour: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
    },

  ],
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;