const addStudent           = require('./add-student/add-student.module'),
      confirmSectionDelete = require('./confirm-section-delete/confirm-section-delete.module');

const moduleName   = 'section-dialogs.component',
      dependencies = [ addStudent, confirmSectionDelete ];

angular.module(moduleName, dependencies);

module.exports = moduleName;