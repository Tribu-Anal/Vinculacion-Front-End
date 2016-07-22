const service = require('./majors.service');

const moduleName   = 'majors.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;