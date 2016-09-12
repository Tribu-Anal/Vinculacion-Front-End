const config        = require("./app.config"),
	  components    = require("./app.components"),
	  services      = require("./app.services"),
	  shared        = require("./app.shared"),
	  run           = require("./app.run");

const moduleName   = 'VinculacionApp',
      dependencies = [ 'ui.router', 'toaster', 'ngAnimate', 'ngSanitize',
                       'ngAria', 'ngMaterial', 'ngMessages',
		               'ngCookies', 'angular-spinkit', 'angularModalService',
		               'directives.customvalidation.customValidationTypes',
		               'checklist-model', components, services, shared
		             ];

angular.module(moduleName, dependencies)
	.config(config)
	.run(run);

module.exports = moduleName;