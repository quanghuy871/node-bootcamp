const express = require('express');
const router = express.Router({mergeParams: true});
const reviewControllers = require('./../controllers/reviewController');
const authControllers = require('./../controllers/authController');

router.route('/')
.get(reviewControllers.getAllReviews)
.post(authControllers.protect, authControllers.restrictTo(['user']), reviewControllers.createReview);

module.exports = router;