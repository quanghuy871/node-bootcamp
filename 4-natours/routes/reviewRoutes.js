const express = require('express');
const router = express.Router({mergeParams: true});
const reviewControllers = require('./../controllers/reviewController');
const authControllers = require('./../controllers/authController');

router.route('/')
.get(reviewControllers.getAllReviews)
.post(authControllers.protect, reviewControllers.setTourUserId, authControllers.restrictTo(['user']), reviewControllers.createReview);

router.route('/:id')
.get(reviewControllers.getReview)
.patch(authControllers.protect, reviewControllers.updateReview)
.delete(authControllers.protect, reviewControllers.deleteReview);

module.exports = router;