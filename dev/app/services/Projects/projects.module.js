const service = require('./projects.service');

const moduleName   = 'projects.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;