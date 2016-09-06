const config = require('./landing.config'),
      Login  = require('./login/login.module'),
      EnableStudent = require('./enable-student/enable-student.module'),
      ActivateProfessor = require('./activate-professor/activate-professor.module');
      
const moduleName   = 'landing-bundle',
      dependencies = [ Login, EnableStudent, ActivateProfessor ];

angular.module(moduleName, dependencies)
	.config(config);

module.exports = moduleName;
