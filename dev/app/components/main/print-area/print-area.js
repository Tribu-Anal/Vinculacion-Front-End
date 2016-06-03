"use strict";

let moduleName = 'print-area.component';

let config     = require('./print-area.config'),
	controller = require('./print-area.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("PrintAreaController", controller);

module.exports = moduleName;