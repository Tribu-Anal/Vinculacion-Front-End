const directive = require('./tb-equals.directive');

const moduleName   = 'tb-equals.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;