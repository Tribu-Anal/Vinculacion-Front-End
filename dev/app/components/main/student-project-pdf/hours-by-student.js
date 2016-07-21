"use strict";

let moduleName = 'hours-by-student.component';

let config     = require('./hours-by-student.config'),
	controller = require('./hours-by-student.controller');

angular.module(moduleName, [])
	.config(config)
	.controller("HoursByStudentController", controller);

module.exports = moduleName;