const  config     = require('./classes.config'),
	   controller = require('./classes.controller');

const moduleName   = 'classes.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;