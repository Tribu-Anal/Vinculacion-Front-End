SectionController.$inject = [ 'TbUtils', 'sections', '$stateParams' ];

function SectionController (TbUtils, sections, stateParams) {

    const vm = this;

    vm.section  = JSON.parse(atob(stateParams.section));
    vm.students = [];
    vm.projects = [];

    vm.studentsLoading = true;
    vm.projectsLoading = true;

    vm.showSectionProjectModal = showSectionProjectModal;

    vm.studentsTableSchema = require('../../../table-schemas/section-students-table-schema');
    vm.projectsTableSchema = require('../../../table-schemas/section-projects-table-schema');

    vm.goToEditHours = project => { TbUtils.go('main.edit-hours', { projectId: project.Id, sectionId: vm.section.Id} ) };

    vm.toTitleCase = TbUtils.toTitleCase;

    TbUtils.getExistingAndLoad(sections.getStudents, vm.section.Id, vm.students, () => { vm.studentsLoading = false; });
    TbUtils.getExistingAndLoad(sections.getProjects, vm.section.Id, vm.projects, () => { vm.projectsLoading = false; });

    function showSectionProjectModal () {
         TbUtils.showCustomModal('NewSectionProjectController as vm', 
            'templates/components/main/section-project-form/section-project-form.html',
            projects => { vm.projects = projects; },
            { sectionId: vm.section.Id, projectIds: vm.projects.map(obj => obj.Id) });
    }

}

module.exports = { name: 'SectionController', ctrl: SectionController };
