const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/userController');
const authControllers = require('./../controllers/authController');

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);

router.post('/forgotPassword', authControllers.forgotPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);
router.patch('/updateMyPassword', authControllers.protect, authControllers.updatePassword);
router.get('/me', authControllers.protect, controllers.getMe, controllers.getUser);
router.patch('/updateMe', authControllers.protect, controllers.updateMe);
router.patch('/deleteMe', authControllers.protect, controllers.deleteMe);

router.route('/')
.get(controllers.getAllUsers)
.post(controllers.createUser);

router.route('/:id')
.get(controllers.getUser)
.patch(authControllers.protect, authControllers.restrictTo(['user']), controllers.updateUser)
.delete(controllers.deleteUser);

module.exports = router;