const directive = require('./tb-headerbar.directive');

const moduleName   = 'tb-headerbar',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;