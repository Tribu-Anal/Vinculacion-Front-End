const  config     = require('./periods.config'),
	   controller = require('./periods.controller');

const moduleName   = 'periods.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;