const directive = require('./tb-table-input-elem.directive');

const moduleName   = 'tb-table-input-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;