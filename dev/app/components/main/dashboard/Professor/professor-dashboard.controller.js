ProfessorDashboardController.$inject = ['$rootScope', '$stateParams', 'TbUtils', 
    'sections'];

function ProfessorDashboardController($rootScope, $stateParams, TbUtils, sections) {
    var vm = this;

    vm.sections = [];
    vm.sectionStudents = [];

    vm.getStudents = getStudents;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);

    function currentSectionsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.sections);
    }

    function currentSectionsFail(response) {
        console.log(response);
    }

    function getStudents(sectionId) {
        sections.getStudents(sectionId, getStudentsSuccess, getStudentsFail);
    }

    function getStudentsSuccess(response) {
        vm.sectionStudents = [];
        TbUtils.fillListWithResponseData(response.data, vm.sectionStudents);
    }

    function getStudentsFail(response) {
        console.log(response);
    }
}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };