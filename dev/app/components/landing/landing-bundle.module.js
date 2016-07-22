const config = require('./landing.config'),
      Login  = require('./login/login.module');

const moduleName   = 'landing-bundle',
      dependencies = [ Login ];

angular.module(moduleName, dependencies)
	.config(config);

module.exports = moduleName;