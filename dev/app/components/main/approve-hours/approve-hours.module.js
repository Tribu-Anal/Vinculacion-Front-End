const  config     = require('./approve-hours.config'),
	   controller = require('./approve-hours.controller');

const moduleName   = 'approve-hours.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;