const config                  = require('./professor-form.config'),
	  newProfessorController  = require('./new-professor.controller'),
	  editProfessorController = require('./edit-professor.controller');

const moduleName   = 'professor-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(newProfessorController.name, newProfessorController.ctrl)
	.controller(editProfessorController.name, editProfessorController.ctrl);

module.exports = moduleName;