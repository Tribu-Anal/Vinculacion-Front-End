"use strict";

let moduleName = 'login.component';

let config     = require('./login.config'),
	controller = require('./login.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("LoginController", controller);

module.exports = moduleName;