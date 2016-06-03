"use strict";

let auth                  = require('./services/authentication.service'),
	hours                 = require('./services/hours.service.js'),
	majors                = require('./services/majors.service.js'),
	projects              = require('./services/projects.service.js'),
	recentProjects        = require('./services/recent-projects.service.js'),
	register              = require('./services/register.service.js'),
	reports               = require('./services/reports.service.js'),
	requests              = require('./services/requests.service.js'),
	role                  = require('./services/role.service.js'),
	sectionData           = require('./services/section-data.service.js'),
	sections              = require('./services/sections.service.js'),
	tableContent          = require('./services/table-content.service.js'),
    TbUtils               = require('./services/tb-utils.service');

let moduleName = 'vinculacion.services';

angular.module(moduleName, [])
	.factory('authentication', auth)
	.factory('horas', hours)
	.factory('majors', majors)
	.factory('projects', projects)
	.factory('recentProjects', recentProjects)
	.factory('register', register)
	.factory('reports', reports)
	.factory('requests', requests)
	.factory('role', role)
	.factory('sectionData', sectionData)
	.factory('sections', sections)
	.factory('tableContent', tableContent)
	.factory('TbUtils', TbUtils);

module.exports = moduleName;