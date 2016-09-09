ProjectController.$inject = [ 'TbUtils', 'majors', 'sections', '$stateParams' ];

function ProjectController(TbUtils, majors, sections, stateParams) {
    const vm = this;

    vm.project = JSON.parse(atob(stateParams.project));
    vm.majors = [];
    vm.sections = [];

    vm.tableSchema = require('../../../table-schemas/sections-table-schema');

    vm.majorsLoading = false;
    vm.sectionsLoading = false;

    vm.goToSection = section => { TbUtils.go('main.section', { section: btoa(JSON.stringify(section)) }); };

    TbUtils.getExistingAndLoad(majors.getMajorsByProject, vm.project.Id, vm.majors, () => { vm.majorsLoading = false; });
    TbUtils.getExistingAndLoad(sections.getSectionsByProject, vm.project.Id, vm.sections, () => { vm.sectionsLoading = false; });

}

module.exports = { name: 'ProjectController', ctrl: ProjectController };
