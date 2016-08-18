const ActivateProfessor     = require('./activate-professor/activate-professor.module'),
      Dashboard             = require('./dashboard/dashboard.module');
      EditHours             = require('./edit-hours/edit-hours.module'),
      Main                  = require('./main.module'),
      ProfessorForm         = require('./professor-form/professor-form.module'),
      Project               = require('./project/project.module'),
      ProjectEvaluationForm = require('./project-evaluation-form/project-evaluation-form.module'),
      ProjectForm           = require('./project-form/project-form.module'),
      Projects              = require('./projects/projects-bundle.module'),
      Reports               = require('./reports/reports.module'),
      Section               = require('./section/section-bundle.module'),
      SectionForm           = require('./section-form/section-form-bundle.module'),
      Sections              = require('./sections/sections.module'),
      Settlement            = require('./settlement/settlement.module');

const moduleName = 'main-bundle',
      components = [ ActivateProfessor, Dashboard, EditHours, Main, ProfessorForm, Project,
                     ProjectEvaluationForm, ProjectForm, Projects, Reports, Section,
                     SectionForm, Sections, Settlement];

angular.module(moduleName, components);

module.exports = moduleName;
