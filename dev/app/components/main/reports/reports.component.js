"use strict";

let moduleName = 'reports.component';

let HoursByStudent = require('./hours-by-student/hours-by-student');

let reports = [ HoursByStudent ];

angular.module(moduleName, reports);

module.exports = moduleName;