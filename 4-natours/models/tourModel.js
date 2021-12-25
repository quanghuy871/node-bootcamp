const mongoose = require('mongoose');
const {Schema} = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The tour must have name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'The tour mush have price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;