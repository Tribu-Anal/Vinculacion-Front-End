"use strict";

let moduleName = 'vinculacion.shared';

let tbHeaderbar = require('./shared/TB-Headerbar/tb-headerbar'),
	tbLoading   = require('./shared/TB-Loading/tb-loading'),
	tbRoundBtn  = require('./shared/TB-RoundBtn/tb-round-btn'),
	tbSearch    = require('./shared/TB-Search/tb-search'),
	tbSidebar   = require('./shared/TB-Sidebar/tb-sidebar'),
	tbTable     = require('./shared/TB-Table/tb-table');

let shared = [
	tbHeaderbar, tbLoading, tbRoundBtn, 
	tbSearch, tbSidebar, tbTable
];
console.log(tbSidebar);
angular.module(moduleName, shared);

module.exports = moduleName;