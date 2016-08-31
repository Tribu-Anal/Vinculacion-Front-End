const directive  = require('./tb-table.directive');

const moduleName   = 'tb-table',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;