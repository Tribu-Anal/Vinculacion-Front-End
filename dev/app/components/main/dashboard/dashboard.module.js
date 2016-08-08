const  config     = require('./dashboard.config'),
	   StudentController = require('./student-dashboard.controller');

const moduleName   = 'dashboard.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(StudentController.name, StudentController.ctrl);

module.exports = moduleName;
