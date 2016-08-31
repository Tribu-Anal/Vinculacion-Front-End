const  config     = require('./import-students.config'),
	   controller = require('./import-students.controller');

const moduleName   = 'import-students.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;