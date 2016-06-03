"use strict";

let Landing = require('./components/landing/landing.component'),
	Main    = require('./components/main/main.component');

let moduleName = 'vinculacion.components';

let components = [ Landing, Main ];

angular.module(moduleName, components);

module.exports = moduleName;