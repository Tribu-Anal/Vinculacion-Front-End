const auth        = require('./services/Auth/auth.module'),
      hours       = require('./services/Hours/hours.module'),
      majors      = require('./services/Majors/majors.module'),
      professors  = require('./services/Professors/professors.module'),
      projects    = require('./services/Projects/projects.module'),
      reports     = require('./services/Reports/reports.module'),
      sections    = require('./services/Sections/sections-bundle.module'),
      tbTable     = require('./services/TbTable/tb-table-services.module'),
      tbUtils     = require('./services/TbUtils/tb-utils.module'),
      users       = require('./services/Users/users.module');

const moduleName    = 'vinculacion.services',
      dependencies  = [ auth, hours, majors, professors, projects, reports,
                        sections, tbTable, tbUtils, users ];

angular.module(moduleName, dependencies);

module.exports = moduleName;