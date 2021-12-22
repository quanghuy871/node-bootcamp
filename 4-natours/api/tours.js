const express = require('express');
const router = express.Router();

const getAllTours = require('./getAllTours');
const createTour = require('./createTour');
const getTour = require('./getTour');
const updateTour = require('./updateTour');
const deleteTour = require('./deleteTour');

router.route('/v1/tours').get(getAllTours).post(createTour);
router.route('/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;