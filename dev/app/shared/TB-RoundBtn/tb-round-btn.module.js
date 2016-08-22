const directive = require('./tb-round-btn.directive');

const moduleName   = 'tb-round-btn',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;