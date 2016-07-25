const controller = require('./confirm-section-delete.controller');

const moduleName   = 'confirm-section-delete-dialog.component',
	  dependencies = [];
	  
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;