const config     = require('./projects.config'),
	  controller = require('./projects.controller');

const moduleName   = 'projects.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;