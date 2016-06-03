"use strict";

let config        = require("./config"),
	components    = require("./components"),
	services      = require("./services"),
	shared        = require("./shared"),
	run           = require("./run");

let dependencies = [ 'ui.router', 'toaster', 'ngAnimate', 
		             'ngCookies', 'angular-spinkit', 'angularModalService', 
		             components, services, shared 
		           ];

angular
	.module("VinculacionApp", dependencies)
	.config(config)
	.run(run);