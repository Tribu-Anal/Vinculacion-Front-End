const  config     = require('./sections.config'),
	   controller = require('./sections.controller');

const moduleName   = 'sections.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;