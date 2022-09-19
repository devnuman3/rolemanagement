const express = require('express');
const userController = require('../controllers/user.controller')
const userRouter = express.Router();
const userAuth = require('../controllers/authorizations/user.auth')

userRouter.route('/adduser').post(userController.createUser)

userRouter.route('/user/editprofile').patch(userAuth.getUser,userController.editProfile)

userRouter.route('/user/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser)

module.exports = userRouter