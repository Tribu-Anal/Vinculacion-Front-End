const controller = require('./edit-section.controller');

const moduleName   = 'edit-section-dialog.component',
	  dependencies = [];
	  
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;