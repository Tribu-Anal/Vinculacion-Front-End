const sectionform = require('./section-form.module'),
      dialogs = require('./dialogs/add-projects/add-projects.module');

const moduleName   = 'section-form-bundle.component',
      dependencies = [ sectionform, dialogs ];

angular.module(moduleName, dependencies);

module.exports = moduleName;