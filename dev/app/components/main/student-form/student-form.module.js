const  config     = require('./student-form.config'),
	   newStudentController = require('./new-student.controller'),
	   editStudentController = require('./edit-student.controller');

const moduleName   = 'student-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(newStudentController.name, newStudentController.ctrl)
	.controller(editStudentController.name, editStudentController.ctrl);

module.exports = moduleName;