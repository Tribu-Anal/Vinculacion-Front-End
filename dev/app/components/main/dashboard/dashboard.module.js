const  config     = require('./dashboard.config'),
	   controller = require('./dashboard.controller');

const moduleName   = 'dashboard.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;