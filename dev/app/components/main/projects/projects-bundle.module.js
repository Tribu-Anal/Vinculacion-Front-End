const projects             = require('./projects.module'),
      confirmProjectDelete = require('./confirm-project-delete/confirm-project-delete.module');

const moduleName   = 'projects-bundle.component',
      dependencies = [ projects, confirmProjectDelete ];

angular.module(moduleName, dependencies);

module.exports = moduleName;