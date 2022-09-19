const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authorizations/user.auth')
const roleHelpers = require('../controllers/authorizations/helpers/user.roles')
const permissionHelpers = require('../controllers/authorizations/helpers/user.permissions')

authRouter.route('/auth/login').post(authController.login);
authRouter.route('/auth/roles').get(authController.getUser,roleHelpers.getRoles);
authRouter.route('/auth/permissions').get(authController.getUser,permissionHelpers.getPermissions);

module.exports = authRouter;