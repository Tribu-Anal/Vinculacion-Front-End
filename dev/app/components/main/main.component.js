"use strict";

let moduleName = 'main.component';

let ConfirmDelete = require('./projects/confirm-delete/confirm-delete'),
	Home          = require('./home/home'),
	PrintArea     = require('./print-area/print-area'),
	Project       = require('./project/project'),
	ProjectForm   = require('./project-form/project-form'),
	Projects      = require('./projects/projects'),
	Main          = require('./main'),
	Reports       = require('./reports/reports.component');

let components = [ ConfirmDelete, Home, PrintArea, Project, 
				   ProjectForm, Projects, Main, Reports ];

angular.module(moduleName, components);

module.exports = moduleName;