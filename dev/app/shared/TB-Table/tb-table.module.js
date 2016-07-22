const directive  = require('./tb-table.directive'),
      controller = require('./tb-table.controller');

const moduleName   = 'tb-table',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;