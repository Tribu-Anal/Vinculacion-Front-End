const config     = require('./professor-form.config'),
	  controller = require('./professor-form.controller');

const moduleName   = 'professor-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;