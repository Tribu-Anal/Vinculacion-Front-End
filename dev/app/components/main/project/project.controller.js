ProjectController.$inject = ['$rootScope', '$stateParams', '$state',
    'projects', 'TbUtils', 'majors', 'sections'
];

function ProjectController($rootScope, $stateParams, $state, projects,
    TbUtils, majors, sections) {
    var vm = this;

    vm.project = {};
    vm.majors = [];
    vm.sections = null;
    vm.projectLoading = true;
    vm.tableSchema = require('../../../table-schemas/sections-table-schema');
    vm.goToSection = goToSection;

    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);

    sections.getSectionsByProject($stateParams.projectId, getSectionsByProjectSuccess, 
                                  getSectionsByProjectFail);

    function goToSection (data) {
        TbUtils.go('main.section', { sectionId: data.Id });
    }

    function getNamesFromId(IdArray, getData, getSuccess, getFail) {
        for (let id in IdArray) {
            getData(IdArray[id], getSuccess, getFail);
        }
    }

    function getMajorSuccess(response) {
        vm.majors.push(response.data.Name);
    }

    function getMajorFail(response) {}

    function getSectionSuccess(response) {
        vm.sections.push({
            code: response.data.Code,
            name: response.data.Class.Name
        });
    }

    function getSectionFail(response) {}

    function getProjectSuccess(response) {
        vm.project = response.data;
        vm.project.Name = TbUtils.toTitleCase(vm.project.Name);
        getNamesFromId(vm.project.MajorIds, majors.getMajor, getMajorSuccess, getMajorFail);
        getNamesFromId(vm.project.SectionIds, sections.getSection, getSectionSuccess, getSectionFail);
        vm.projectLoading = false;
    }

    function getProjectFail(response) {
        TbUtils.showErrorMessage('error', response,
            'El proyecto deseado no existe.',
            'Error');

        TbUtils.go('main.dashboard');

        vm.projectLoading = false;
    }

    function getSectionsByProjectSuccess(response) {
        vm.sections = response.data;
    }

    function getSectionsByProjectFail() {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
    }

}

module.exports = { name: 'ProjectController', ctrl: ProjectController };
