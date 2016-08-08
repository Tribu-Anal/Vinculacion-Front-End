const controller = require('./professor-dashboard.controller');

const moduleName   = 'professor-dashboard.component',
	  dependencies = [];
	  
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;