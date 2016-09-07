const config                = require('./section-form.config'),
	  newSectionController  = require('./new-section.controller'),
	  editSectionController = require('./edit-section.controller');

const moduleName   = 'section-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(newSectionController.name, newSectionController.ctrl)
	.controller(editSectionController.name, editSectionController.ctrl);

module.exports = moduleName;