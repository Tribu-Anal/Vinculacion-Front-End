const directive  = require('./tb-search-field.directive');

const moduleName   = 'tb-search-field',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;