const service = require('./classes.service');

const moduleName   = 'classes.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;