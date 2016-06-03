"use strict";

let moduleName = 'project.component';

let config     = require('./project.config'),
	controller = require('./project.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("ProjectController", controller);

module.exports = moduleName;