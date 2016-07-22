const config     = require('./project-evaluation-form.config'),
	  controller = require('./project-evaluation-form.controller');

const moduleName   = 'project-evaluation-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;