const directive = require('./tb-loading.directive');

const moduleName   = 'tb-loading',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;