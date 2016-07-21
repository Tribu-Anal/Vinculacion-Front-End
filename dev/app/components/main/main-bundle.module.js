const ActivateProfessor = require('./activare-professor/activare-professor.module'),
      Main              = require('./main.module'),
      PrintArea         = require('./print-area/print-area.module'),
      ProfessorForm     = require('./professor-form/professor-form.module'),
      Project           = require('./project/project.module'),
      ProjectForm       = require('./project-form/project-form.module'),
      Projects          = require('./projects/projects.module'),
      Reports           = require('./reports/reports-bundle.module'),
      Section           = require('./section/section-bundle.module'),
      SectionForm       = require('./section-form/section-form.module'),
      Sections          = require('./sections/sections.module');

const moduleName = 'main-bundle',
      components = [ ActivateProfessor, Main, PrintArea, ProfessorForm, Project,
                     ProjectForm, Projects, Reports, Section, SectionForm, Sections ];

angular.module(moduleName, components);

module.exports = moduleName;