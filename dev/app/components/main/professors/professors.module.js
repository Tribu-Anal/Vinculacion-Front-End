const  config     = require('./professors.config'),
	   controller = require('./professors.controller');

const moduleName   = 'professors.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;