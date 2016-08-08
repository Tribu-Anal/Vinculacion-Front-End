const  config     = require('./settlement.config'),
	   controller = require('./settlement.controller');

const moduleName   = 'settlement.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;