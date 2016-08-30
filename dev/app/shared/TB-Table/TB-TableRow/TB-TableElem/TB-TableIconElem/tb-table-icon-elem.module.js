const directive = require('./tb-table-icon-elem.directive');

const moduleName   = 'tb-table-icon-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;