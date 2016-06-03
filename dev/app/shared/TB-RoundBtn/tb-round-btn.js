"use strict";

let moduleName = 'tbRoundBtn';

let tbRoundBtn = require('./tb-round-btn.directive');

angular.module(moduleName, [])
	.directive(moduleName, tbRoundBtn);

module.exports = moduleName;