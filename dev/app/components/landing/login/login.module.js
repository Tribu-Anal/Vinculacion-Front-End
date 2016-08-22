const config     = require('./login.config'),
	  controller = require('./login.controller');

const moduleName   = 'login.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;