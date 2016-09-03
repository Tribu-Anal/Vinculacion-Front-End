const directive  = require('./tb-load-more-btn.directive');

const moduleName   = 'tb-load-more-btn.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;