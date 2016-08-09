const  config     = require('./dashboard.config'),
	   StudentController = require('./student-dashboard.controller'),
	   ProfessorController = require('./professor-dashboard.controller'),
		 AdminController = require('./admin-dashboard.controller');

const moduleName   = 'dashboard.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(StudentController.name, StudentController.ctrl)
	.controller(ProfessorController.name, ProfessorController.ctrl)
	.controller(AdminController.name, AdminController.ctrl);

module.exports = moduleName;
