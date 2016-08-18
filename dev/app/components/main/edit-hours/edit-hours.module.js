const  config     = require('./edit-hours.config'),
	   controller = require('./edit-hours.controller');

const moduleName   = 'edit-hours.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;
