const ApproveHours          = require('./approve-hours/approve-hours.module'),
      Classes               = require('./classes/classes.module'),
      ClassForm             = require('./class-form/class-form.module'),
      Dashboard             = require('./dashboard/dashboard.module');
      EditHours             = require('./edit-hours/edit-hours.module'),
      ImportStudents        = require('./import-students/import-students.module'),
      Main                  = require('./main.module'),
      Periods               = require('./periods/periods.module'),
      Professors            = require('./professors/professors.module'),
      ProfessorForm         = require('./professor-form/professor-form.module'),
      Project               = require('./project/project.module'),
      ProjectEvaluationForm = require('./project-evaluation-form/project-evaluation-form.module'),
      ProjectForm           = require('./project-form/project-form.module'),
      Projects              = require('./projects/projects.module'),
      Reports               = require('./reports/reports.module'),
      Section               = require('./section/section-bundle.module'),
      SectionForm           = require('./section-form/section-form-bundle.module'),
      Sections              = require('./sections/sections.module'),
      Settlement            = require('./settlement/settlement.module'),
      Students              = require('./students/students.module');

const moduleName = 'main-bundle',
      components = [ ApproveHours, Classes, ClassForm, Dashboard, EditHours, ImportStudents, Main,
                     Periods, Professors, ProfessorForm,  Project, ProjectEvaluationForm, ProjectForm, Projects, Reports, 
                     Section, SectionForm, Sections, Settlement, Students ];

angular.module(moduleName, components);

module.exports = moduleName;
