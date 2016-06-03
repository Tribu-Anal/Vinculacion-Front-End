"use strict";

let moduleName = 'landing.component';

let config = require('./landing.config'),
	Login  = require('./login/login');

let components = [ Login ];

angular.module(moduleName, components)
	.config(config);

module.exports = moduleName;