const  config     = require('./enable-student.config'),
	   controller = require('./enable-student.controller');

const moduleName   = 'enable-student.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;
