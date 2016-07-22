const service = require('./hours.service');

const moduleName   = 'hours.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;