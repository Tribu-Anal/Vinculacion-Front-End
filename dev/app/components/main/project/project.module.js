const config     = require('./project.config'),
	  controller = require('./project.controller');

const moduleName   = 'project.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;