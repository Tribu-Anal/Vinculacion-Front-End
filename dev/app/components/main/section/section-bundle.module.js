const section = require('./section.module'),
      dialogs = require('./dialogs/dialogs-bundle.module');

const moduleName   = 'section-bundle.component',
      dependencies = [ section, dialogs ];

angular.module(moduleName, dependencies);

module.exports = moduleName;