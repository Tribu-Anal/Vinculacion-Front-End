const service = require('./{{dashCase name}}.service');

const moduleName   = '{{dashCase name}}.service',
      dependencies = [];

angular.module(moduleName, dependencies)
	.factory(service.name, service.srvc);

module.exports = moduleName;