const service = require('./auth.service');

const moduleName   = 'auth.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;