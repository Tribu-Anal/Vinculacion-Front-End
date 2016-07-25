const confirmProjectDelete = require('./confirm-project-delete/confirm-project-delete.module');

const moduleName   = 'projects-dialogs.component',
      dependencies = [ confirmProjectDelete ];

angular.module(moduleName, dependencies);

module.exports = moduleName;