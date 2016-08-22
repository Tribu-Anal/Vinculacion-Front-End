const directive  = require('./tb-paginator.directive'),
      controller = require('./tb-paginator.controller');

const moduleName   = 'tb-paginator',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;