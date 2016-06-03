"use strict";

let moduleName = 'main';

let config     = require('./main.config'),
	controller = require('./main.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("MainController", controller);

module.exports = moduleName;