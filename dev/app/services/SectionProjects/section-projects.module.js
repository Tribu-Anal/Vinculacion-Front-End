const service = require('./section-projects.service');

const moduleName   = 'section-projects.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;