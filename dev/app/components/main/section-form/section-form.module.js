const config     = require('./section-form.config'),
	  controller = require('./section-form.controller');

const moduleName   = 'section-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;