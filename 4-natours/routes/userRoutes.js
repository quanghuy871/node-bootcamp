const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/userController');

router.route('/users').get(controllers.getAllUsers).post(controllers.createUser);
router.route('/users/:id').get(controllers.getUser).patch(controllers.updateUser).delete(controllers.deleteUser);

module.exports = router;