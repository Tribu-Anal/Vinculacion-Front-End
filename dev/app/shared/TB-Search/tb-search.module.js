const directive  = require('./tb-search.directive'),
      controller = require('./tb-search.controller');

const moduleName   = 'tb-search',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;