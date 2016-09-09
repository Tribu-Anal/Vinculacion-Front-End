const newSectionProjectController = require('./new-section-project.controller');

const moduleName   = 'section-project-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.controller(newSectionProjectController.name, newSectionProjectController.ctrl);

module.exports = moduleName;