const sections    = require('./sections.module'),
      sectionData = require('./section-data.module');

const moduleName   = 'sections-service-bundle',
      dependencies = [ sections, sectionData ];

angular.module(moduleName, dependencies);

module.exports = moduleName;