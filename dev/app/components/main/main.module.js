const config     = require('./main.config'),
	  controller = require('./main.controller');

const moduleName   = 'main.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;