"use strict";

let moduleName = 'main.component';

let Home   = require('./home/home'),
	Main   = require('./main');

let components = [ Home, Main ];

angular.module(moduleName, components);

module.exports = moduleName;