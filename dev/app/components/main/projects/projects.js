"use strict";

let moduleName = 'projects.component';

let config     = require('./projects.config'),
	controller = require('./projects.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("ProjectsController", controller);

module.exports = moduleName;