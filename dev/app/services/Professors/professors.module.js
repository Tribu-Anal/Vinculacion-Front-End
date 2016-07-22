const service = require('./professors.service');

const moduleName   = 'professors.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;