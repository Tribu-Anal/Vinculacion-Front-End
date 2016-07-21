const config        = require("./app.config"),
	  components    = require("./app.components"),
	  services      = require("./app.services"),
	  shared        = require("./app.shared"),
	  run           = require("./app.run");

const moduleName   = 'VinculacionApp',
      dependencies = [ 'ui.router', 'toaster', 'ngAnimate', 'ngMaterial',
		               'ngCookies', 'angular-spinkit', 'angularModalService', 
		               'angularModalService', 
		               'directives.customvalidation.customValidationTypes',
		                components
		             ];

angular.module(moduleName, dependencies)
	.config(config)
	.run(run);

module.exports = moduleName;