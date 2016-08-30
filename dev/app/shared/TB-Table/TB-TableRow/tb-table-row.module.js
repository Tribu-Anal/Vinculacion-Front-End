const directive = require('./tb-table-row.directive');

const moduleName   = 'tb-table-row.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;