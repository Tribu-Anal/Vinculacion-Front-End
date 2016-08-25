const role = require('./Role/role.module');

const moduleName   = 'users.service',
      dependencies = [ role ];

angular.module(moduleName, dependencies);

module.exports = moduleName;