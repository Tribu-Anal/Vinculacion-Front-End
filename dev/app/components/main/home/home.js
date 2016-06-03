"use strict";

let moduleName = 'home.component';

let config     = require('./home.config'),
	controller = require('./home.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("HomeController", controller);

module.exports = moduleName;