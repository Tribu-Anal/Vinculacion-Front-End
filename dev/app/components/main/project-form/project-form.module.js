const config                = require('./project-form.config'),
	  newProjectController  = require('./new-project.controller'),
	  editProjectController = require('./edit-project.controller');

const moduleName   = 'project-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(newProjectController.name, newProjectController.ctrl)
	.controller(editProjectController.name, editProjectController.ctrl);

module.exports = moduleName;