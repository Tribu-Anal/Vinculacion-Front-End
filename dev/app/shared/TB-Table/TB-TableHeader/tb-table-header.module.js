const directive = require('./tb-table-header.directive');

const moduleName   = 'tb-table-header.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;