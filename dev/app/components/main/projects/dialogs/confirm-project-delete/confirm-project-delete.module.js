const controller = require('./confirm-project-delete.controller');

const moduleName   = 'confirm-project-delete-dialog.component',
	  dependencies = [];
console.log(controller);
angular.module(moduleName, dependencies)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;