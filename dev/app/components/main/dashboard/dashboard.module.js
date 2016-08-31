const  config     = require('./dashboard.config'),
		 AdminController = require('./admin-dashboard.controller'),
	   StudentController = require('./student-dashboard.controller'),
	   ProfessorController = require('./professor-dashboard.controller');

const moduleName   = 'dashboard.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(AdminController.name, AdminController.ctrl)
	.controller(StudentController.name, StudentController.ctrl)
	.controller(ProfessorController.name, ProfessorController.ctrl);

module.exports = moduleName;
