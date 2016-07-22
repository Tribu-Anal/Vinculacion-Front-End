const directive = require('./tb-button.directive');

const moduleName   = 'tbButton',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;