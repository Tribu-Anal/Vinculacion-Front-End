const config     = require('./print-area.config'),
	  controller = require('./print-area.controller');

const moduleName   = 'print-area.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;