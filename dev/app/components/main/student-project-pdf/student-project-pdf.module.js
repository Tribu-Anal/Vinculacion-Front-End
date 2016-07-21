const config     = require('./student-project-pdf.config'),
	  controller = require('./student-project-pdf.controller');

const moduleName   = 'student-project-pdf.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;