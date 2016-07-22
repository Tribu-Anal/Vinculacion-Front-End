const config     = require('./section.config'),
	  controller = require('./section.controller');

const moduleName   = 'section.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;