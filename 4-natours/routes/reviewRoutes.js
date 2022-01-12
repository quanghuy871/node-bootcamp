const express = require('express');
const router = express.Router();
const reviewControllers = require('./../controllers/reviewController');
const authControllers = require('./../controllers/authController');

router.route('/').get(reviewControllers.getAllReviews).post(reviewControllers.createReview);


module.exports = router;

