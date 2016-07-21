const ConfirmDelete = require('./projects/confirm-delete/confirm-delete'),
	  PrintArea     = require('./print-area/print-area'),
	  Project       = require('./project/project'),
	  ProjectForm   = require('./project-form/project-form'),
	  Projects      = require('./projects/projects'),
	  Main          = require('./main.module'),
	  Reports       = require('./reports/reports.component');

const moduleName = 'main-bundle',
      components = [ ConfirmDelete, PrintArea, Project, 
				   ProjectForm, Projects, Main, Reports ];

angular.module(moduleName, components);

module.exports = moduleName;