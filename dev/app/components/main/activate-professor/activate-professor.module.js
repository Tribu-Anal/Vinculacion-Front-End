const config     = require('./activate-professor.config'),
      controller = require('./activate-professor.controller');

const moduleName   = 'activate-professor.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;