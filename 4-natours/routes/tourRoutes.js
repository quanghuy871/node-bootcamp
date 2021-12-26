const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/tourController');

router.route('/tours').get(controllers.getAllTours).post(controllers.createTour);
router.route('/tours/:id').get(controllers.getTour).patch(controllers.updateTour).delete(controllers.deleteTour);

module.exports = router;