const service = require('./periods.service');

const moduleName   = 'periods.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;