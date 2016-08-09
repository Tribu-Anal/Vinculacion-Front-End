const service = require('./table-builder.service');

const moduleName   = 'table-builder.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;