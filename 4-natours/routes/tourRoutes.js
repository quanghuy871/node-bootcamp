const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/tourController');
const authControllers = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

router.use('/:tourId/reviews', reviewRouter);

router.route('/')
.get(controllers.getAllTours)
.post(controllers.createTour);


router.route('/:id')
.get(controllers.getTour)
.patch(controllers.updateTour)
.delete(authControllers.protect, authControllers.restrictTo(['admin', 'lead-guide']), controllers.deleteTour);

// router.route('/:tourId/reviews')
// .post(authControllers.protect, authControllers.restrictTo(['user']), reviewController.createReview);


module.exports = router;