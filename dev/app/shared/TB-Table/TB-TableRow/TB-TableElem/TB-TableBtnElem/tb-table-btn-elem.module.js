const directive = require('./tb-table-btn-elem.directive');

const moduleName   = 'tb-table-btn-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;