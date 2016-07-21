const auth                  = require('./services/authentication.service'),
	  hours                 = require('./services/hours.service.js'),
	  majors                = require('./services/majors.service.js'),
	  projects              = require('./services/projects.service.js'),
	  recentProjects        = require('./services/recent-projects.service.js'),
	  reports               = require('./services/reports.service.js'),
	  role                  = require('./services/role.service.js'),
	  sectionData           = require('./services/section-data.service.js'),
	  sections              = require('./services/sections.service.js'),
	  tableContent          = require('./services/table-content.service.js'),
      TbUtils               = require('./services/tb-utils.service');

const moduleName    = 'vinculacion.services',
      dependencies  = [ auth, hours, majors, projects, recentProjects, reports, role,
                        sectionData, sections, tableContent, TbUtils ];

angular.module(moduleName, dependencies);

module.exports = moduleName;