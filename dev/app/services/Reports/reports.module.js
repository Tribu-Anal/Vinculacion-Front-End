const service = require('./reports.service');

const moduleName   = 'reports.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;