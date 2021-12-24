const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/tourController');

router.param('id', controllers.checkValidId);

router.route('/tours').get(controllers.getAllTours).post(controllers.checkBody, controllers.createTour);
router.route('/tours/:id').get(controllers.getTour).patch(controllers.updateTour).delete(controllers.deleteTour);

module.exports = router;