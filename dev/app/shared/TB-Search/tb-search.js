"use strict";

let moduleName = 'tbSearch';

let tbSearch   = require('./tb-search.directive'),
	controller = require('./tb-search.controller');

angular.module(moduleName, [])
	.controller("TbSearchController", controller)
	.directive(moduleName, tbSearch);

module.exports = moduleName;