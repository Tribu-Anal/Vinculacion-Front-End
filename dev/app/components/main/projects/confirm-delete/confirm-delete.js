"use strict";

let moduleName = 'confirm-delete.component';

let controller = require('./confirm-delete.controller');

angular.module(moduleName, [])
	.controller("ConfirmDeleteController", controller);

module.exports = moduleName;