const  config     = require('./student-form.config'),
	   controller = require('./student-form.controller');

const moduleName   = 'student-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;