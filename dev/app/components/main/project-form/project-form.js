"use strict";

let moduleName = 'project-form.component';

let config     = require('./project-form.config'),
	controller = require('./project-form.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("ProjectFormController", controller);

module.exports = moduleName;