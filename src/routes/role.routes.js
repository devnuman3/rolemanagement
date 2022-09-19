const express = require('express');
const routeController = require('../controllers/role.controller')
const roleRouter = express.Router();

roleRouter.route('/addrole').post(routeController.createRole)
roleRouter.route('/allroles').get(routeController.allRoles)
roleRouter.route('/role/:id').patch(routeController.updateRole).delete(routeController.deleteRole)
roleRouter.route('/role/change/:id').patch(routeController.changePermissionStatus)

module.exports = roleRouter