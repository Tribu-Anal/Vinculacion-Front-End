ProfessorDashboardController.$inject = ['$rootScope', '$stateParams', 'TbUtils', 
    'sections', 'students'];

function ProfessorDashboardController($rootScope, $stateParams, TbUtils, sections, students) {
    var vm = this;

    vm.sections = [];
    vm.sectionStudents = [];
    vm.studentHours = [];
    vm.currentProjects = [];

    vm.getStudents = getStudents;
    vm.getStudentsHours = getStudentsHours;
    vm.getCurrentProjects = getCurrentProjects;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);
    console.log('Profesor');

    function currentSectionsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.sections);
        console.log(vm.sections);
        getCurrentProjects();
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
        console.log(vm.sectionStudents);
        //getStudentsHours();
    }

    function getStudentsFail(response) {
        console.log(response);
    }

    function getStudentsHours() {
        vm.studentHours = [];

        for(student in vm.sectionStudents) {
            students.getHours(vm.sectionStudents[student].AccountId, HoursSuccess, HoursFail);
        }
    }

    function HoursSuccess(response) {
        vm.studentHours.push(response.data);
        console.log(vm.studentHours);
    }

    function HoursFail(response) {
        console.log(response);
    }

    function getCurrentProjects() {
        vm.currentProjects = [];

        for(section in vm.sections) {
            getProjectsInSection(vm.sections[section].Id);
        }
    }

    function getProjectsInSection(sectionId) {
        sections.getProjects(sectionId, getProjectsSuccess, getProjectsFail);
    }

    function getProjectsSuccess(response) {
        vm.currentProjects.push(response.data);
        console.log(response.data);
    }

    function getProjectsFail(response) {
        console.log(response);
    }
}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };