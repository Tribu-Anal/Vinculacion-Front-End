ProjectController.$inject = ['$rootScope', '$stateParams', '$state',
    'projects', 'TbUtils', 'majors', 'sections', 'tableContent'
];

function ProjectController($rootScope, $stateParams, $state, projects,
    TbUtils, majors, sections, tableContent) {
    var vm = this;

    vm.project = {};
    vm.majors = [];
    vm.sections = [];
    vm.projectLoading = true;
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo']);
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);
    sections.getSectionsByProject($stateParams.projectId,
        getSectionsByProjectSuccess, getSectionsByProjectFail)
    vm.showEvaluateProjectButton = $rootScope.Role === 'Professor';

    function getMajorSuccess(response) {
        vm.majors.push(response.data.Name);
    }

    function getMajorFail(response) {}

    function getProjectSuccess(response) {
        vm.project = response.data;
        vm.project.Name = TbUtils.toTitleCase(vm.project.Name);

        majors.getMajorsByProject($stateParams.projectId).then(function(response) {
            TbUtils.fillListWithResponseData(response, vm.majors);
            vm.projectLoading = false;
        }, 
            function(error) {
                TbUtils.displayNotification('error', 'Error', error);
                vm.projectLoading = false;
        });
    }

    function getProjectFail(response) {
        TbUtils.showErrorMessage('error', response,
            'El proyecto deseado no existe.',
            'Error');

        $state.go('main.dashboard');

        vm.projectLoading = false;
    }


    vm.downloadProjectReport = function() {
        TbUtils.preventGeneralLoading();
        $state.go('main.evaluateproject', {
            projectId: vm.project.Id
        });
    }

    function getSectionsByProjectSuccess(response) {
        if (response.data.length <= 0)
            return;
        for (let i = 0; i < response.data.length; i++) {
            let section = response.data[i];
            section.projectId = $stateParams.projectId;
            let newTableElement = {
                content: [
                    tableContent.createALableElement(section.Code),
                    tableContent.createALableElement(getClassName(section)),
                    tableContent.createALableElement(getPeriod(section))
                ],
                data: section
            };
            vm.sectionsTable.body.push(newTableElement);
        }
    }

    function getSectionsByProjectFail() {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
    }

    function getClassName(section) {
        return section.Class.Name
    }

    function getPeriod(section) {
        return section.Period.Number + " - " + section.Period.Year
    }
}

module.exports = { name: 'ProjectController', ctrl: ProjectController };
