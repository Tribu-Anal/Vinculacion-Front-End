const  config     = require('./class-form.config'),
	   controller = require('./class-form.controller');

const moduleName   = 'class-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;