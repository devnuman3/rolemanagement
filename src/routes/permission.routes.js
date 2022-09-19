const express = require('express');
const permissionController = require('../controllers/permission.controller')
const permissionRouter = express.Router();

permissionRouter.route('/permission/add').post(permissionController.createPermission)
permissionRouter.route('/permission/allpermissions').get(permissionController.allPermissions)
permissionRouter.route('/permission/:id').patch(permissionController.updatePermission).delete(permissionController.deletePermission)
permissionRouter.route('/permission/change/:id').patch(permissionController.changePermissionStatus)

module.exports = permissionRouter