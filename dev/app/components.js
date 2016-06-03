"use strict";

let ConfirmDelete  = require('./components/main/projects/confirm-delete/confirm-delete.controller'),
	Home           = require('./components/main/home/home.controller'),
	HoursByStudent = require('./components/reports/hours-by-student/hours-by-student.controller'),
	Login          = require('./components/landing/login/login.controller'),
	Main           = require('./components/main/main.controller'), 
	PrintArea      = require('./components/main/print-area/print-area.controller'),
	Project        = require('./components/main/project/project.controller'),
	Projects       = require('./components/main/projects/projects.controller'),
	ProjectForm    = require('./components/main/project-form/project-form.controller'),
	Requests       = require('./components/main/requests/requests.controller'),
	Sections       = require('./components/main/sections/sections.controller');

let moduleName = 'vinculacion.components';

angular.module(moduleName, [])
	.controller('ConfirmDeleteController', ConfirmDelete)
	.controller('HomeController', Home)
	.controller('HoursByStudentController', HoursByStudent)
	.controller('LoginController', Login)
	.controller('MainController', Main)
	.controller('PrintAreaController', PrintArea)
	.controller('ProjectController', Project)
	.controller('ProjectsController', Projects)
	.controller('ProjectFormController', ProjectForm)
	.controller('RequestsController', Requests)
	.controller('SectionsController', Sections);

module.exports = moduleName;