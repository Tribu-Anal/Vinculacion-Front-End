const controller = require('./add-student.controller');

const moduleName   = 'add-student-dialog.component',
	  dependencies = [];
	  
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;