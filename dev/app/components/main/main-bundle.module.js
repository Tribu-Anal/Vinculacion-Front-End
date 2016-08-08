const ActivateProfessor     = require('./activate-professor/activate-professor.module'),
      Main                  = require('./main.module'),
      PrintArea             = require('./print-area/print-area.module'),
      ProfessorForm         = require('./professor-form/professor-form.module'),
      Project               = require('./project/project.module'),
      ProjectEvaluationForm = require('./project-evaluation-form/project-evaluation-form.module'),
      ProjectForm           = require('./project-form/project-form.module'),
      Projects              = require('./projects/projects-bundle.module'),
      Reports               = require('./reports/reports.module'),
      Section               = require('./section/section-bundle.module'),
      SectionForm           = require('./section-form/section-form.module'),
      Sections              = require('./sections/sections.module'),
      StudentProjectPdf     = require('./student-project-pdf/student-project-pdf.module'),
      SectionParticipants   = require('./section-participants/section-participants.module');

const moduleName = 'main-bundle',
      components = [ ActivateProfessor, Main, PrintArea, ProfessorForm, Project,
                     ProjectEvaluationForm, ProjectForm, Projects, Reports, Section, 
                     SectionForm, Sections, StudentProjectPdf, SectionParticipants ];

angular.module(moduleName, components);

module.exports = moduleName;