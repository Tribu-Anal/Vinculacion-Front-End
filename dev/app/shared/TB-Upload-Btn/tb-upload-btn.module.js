const directive  = require('./tb-upload-btn.directive'),
      controller = require('./tb-upload-btn.controller');

const moduleName   = 'tb-upload-btn.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)	
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;