const projects = require('./projects.module'),
      dialogs  = require('./dialogs/dialogs-bundle.module');

const moduleName   = 'projects-bundle.component',
      dependencies = [ projects, dialogs ];

angular.module(moduleName, dependencies);

module.exports = moduleName;