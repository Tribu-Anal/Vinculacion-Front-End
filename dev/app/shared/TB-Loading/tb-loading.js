"use strict";

let moduleName = 'tbLoading';

let tbLoading = require('./tb-loading.directive');

angular.module(moduleName, [])
	.directive(moduleName, tbLoading);

module.exports = moduleName;