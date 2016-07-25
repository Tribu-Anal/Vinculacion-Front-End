const addStudent           = require('./add-student/add-student.module');

const moduleName   = 'section-dialogs.component',
      dependencies = [ addStudent ];

angular.module(moduleName, dependencies);

module.exports = moduleName;