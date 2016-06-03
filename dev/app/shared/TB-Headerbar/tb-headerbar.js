"use strict";

let moduleName = 'tbHeaderbar';

let tbHeaderbar = require('./tb-headerbar.directive');

angular.module(moduleName, [])
	.directive(moduleName, tbHeaderbar);

module.exports = moduleName;