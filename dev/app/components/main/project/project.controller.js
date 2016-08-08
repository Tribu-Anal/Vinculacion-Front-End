ProjectController.$inject = ['$rootScope', '$stateParams', '$state', 'projects',
    'TbUtils', 'majors', 'sections'
];

function ProjectController($rootScope, $stateParams, $state, projects, TbUtils, majors, sections) {
    var vm = this;

    vm.project = {};
    vm.majors = [];
    vm.sections = [];
    vm.projectLoading = true;

    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);
    vm.showEvaluateProjectButton = $rootScope.Role==='Professor';

    function getNamesFromId(IdArray, getData, getSuccess, getFail) {
        for(let id in IdArray) {
            getData(IdArray[id], getSuccess, getFail);
        }
    }

    function getMajorSuccess(response) {
        vm.majors.push(response.data.Name);
    }

    function getMajorFail(response) {
        console.log(response);
    }

    function getSectionSuccess(response) {
        vm.sections.push({code: response.data.Code, name: response.data.Class.Name});
    }

    function getSectionFail(response) {
        console.log(response);
    }

    function getProjectSuccess(response) {
        console.log(response);
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

        $state.go('main.dashboard');

        vm.projectLoading = false;
    }

    function downloadReport(participant) {
        let params = {
            templateUrl: 'main/student-project-pdf/student-project-pdf.html',
            previousState: 'main.project',
            previousStateParams: {
                projectId: $stateParams.projectId
            },
            reportParams: getReportParams(participant),
            showPrintButton: true
        }
        TbUtils.preventGeneralLoading();
        $state.go('main.printarea', {
            params: params
        });
    }

    function getReportParams(participant) {
        let reportParams = {
            AccountId: participant.AccountId,
            Campus: participant.Campus,
            Major: participant.Major,
            Name: participant.Name
        }

        return reportParams;
    }

    vm.downloadProjectReport = function() {
        TbUtils.preventGeneralLoading();
        $state.go('main.evaluateproject', {
            projectId: vm.project.Id
        });
    }

}

module.exports = { name: 'ProjectController', ctrl: ProjectController };
