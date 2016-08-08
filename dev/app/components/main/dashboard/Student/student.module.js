const controller = require('./student-dashboard.controller');

const moduleName   = 'student-dashboard.component',
	  dependencies = [];
	  
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;