const directive = require('./tb-table-label-elem.directive');

const moduleName   = 'tb-table-label-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;