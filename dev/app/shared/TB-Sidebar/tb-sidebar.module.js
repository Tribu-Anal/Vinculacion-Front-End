const directive  = require('./tb-sidebar.directive'),
      controller = require('./tb-sidebar.controller');

const moduleName   = 'tb-sidebar',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;