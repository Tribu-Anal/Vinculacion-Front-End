const config     = require('./project-form.config'),
	  controller = require('./project-form.controller');

const moduleName   = 'project-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;