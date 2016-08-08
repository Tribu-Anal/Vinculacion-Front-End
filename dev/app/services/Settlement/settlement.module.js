const service = require('./settlement.service');

const moduleName   = 'settlement.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;