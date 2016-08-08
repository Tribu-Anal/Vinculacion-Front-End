const controller = require('./add-projects.controller');

const moduleName   = 'add-projects-dialog.component',
	  dependencies = [];
	  
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;