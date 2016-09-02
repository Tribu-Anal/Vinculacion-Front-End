const  config              = require('./class-form.config'),
	   newClassController  = require('./new-class.controller'),
	   editClassController = require('./edit-class.controller');

const moduleName   = 'class-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(newClassController.name, newClassController.ctrl)
	.controller(editClassController.name, editClassController.ctrl);

module.exports = moduleName;