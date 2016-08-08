const  config     = require('./section-participants.config'),
	   controller = require('./section-participants.controller');

const moduleName   = 'section-participants.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;