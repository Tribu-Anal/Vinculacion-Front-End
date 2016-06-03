"use strict";

let moduleName = 'tbSidebar';

let tbSidebar   = require('./tb-sidebar.directive'),
	controller = require('./tb-sidebar.controller');

angular.module(moduleName, [])
	.controller("TbSidebarController", controller)
	.directive(moduleName, tbSidebar);

module.exports = moduleName;