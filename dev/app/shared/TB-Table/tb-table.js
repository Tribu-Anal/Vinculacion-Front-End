"use strict";

let moduleName = 'tbTable';

let tbTable   = require('./tb-table.directive'),
	controller = require('./tb-table.controller');

angular.module(moduleName, [])
	.controller("TbTableController", controller)
	.directive(moduleName, tbTable);

module.exports = moduleName;