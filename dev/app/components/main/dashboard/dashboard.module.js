const  config     = require('./dashboard.config'),
	   Student = require('./Student/student.module'),
	   Professor = require('./Professor/professor.module');

const moduleName   = 'dashboard.component',
      dependencies = [Student, Professor];

angular.module(moduleName, dependencies)
	.config(config);

module.exports = moduleName;
