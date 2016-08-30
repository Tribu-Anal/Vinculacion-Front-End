const directive = require('./tb-table-button-elem.directive');

const moduleName   = 'tb-table-button-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;