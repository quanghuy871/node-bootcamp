const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/tourController');
const authControllers = require('./../controllers/authController');

router.route('/')
.get(controllers.getAllTours)
.post(controllers.createTour);

router.route('/:id')
.get(controllers.getTour)
.patch(controllers.updateTour)
.delete(authControllers.protect, authControllers.restrictTo(['admin', 'lead-guide']), controllers.deleteTour);

module.exports = router;