const directive = require('./tb-table-elem.directive');

const moduleName   = 'tb-table-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;