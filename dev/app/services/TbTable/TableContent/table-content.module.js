const service = require('./table-content.service');

const moduleName   = 'table-content.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;