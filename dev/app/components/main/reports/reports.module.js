const config     = require('./reports.config'),
	  controller = require('./reports.controller');

const moduleName   = 'reports.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;