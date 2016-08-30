const directive = require('./tbtable-elem.directive');

const moduleName   = 'tbtable-elem.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv);

module.exports = moduleName;