const  config     = require('./students.config'),
	   controller = require('./students.controller');

const moduleName   = 'students.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;