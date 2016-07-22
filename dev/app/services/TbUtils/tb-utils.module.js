const service = require('./tb-utils.service');

const moduleName   = 'tb-utils.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;