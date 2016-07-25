const addStudent           = require('./add-student/add-student.module'),
      editSection          = require('./edit-section/edit-section.module'),
      confirmSectionDelete = require('./confirm-section-delete/confirm-section-delete.module');

const moduleName   = 'section-dialogs.component',
      dependencies = [ addStudent, editSection, confirmSectionDelete ];

angular.module(moduleName, dependencies);

module.exports = moduleName;