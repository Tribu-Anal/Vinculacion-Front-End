const service = require('./section-data.service');

const moduleName   = 'section-data.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;