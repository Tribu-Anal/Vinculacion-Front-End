const service = require('./sections.service');

const moduleName   = 'sections.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;