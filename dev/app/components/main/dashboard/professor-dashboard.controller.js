ProfessorDashboardController.$inject = ['$rootScope', '$stateParams', 'TbUtils', 
    'sections', 'students'];

function ProfessorDashboardController($rootScope, $stateParams, TbUtils, sections, students) {
    var vm = this;

    vm.sections        = [];
    vm.sectionStudents = [];
    vm.studentHours    = [];
    vm.currentProjects = [];

    vm.sectionsLoading        = true;
    vm.studentsLoading        = true;
    // vm.studentsHoursLoading   = true;
    // vm.currentProjectsLoading = true;

    vm.getStudents        = getStudents;
    vm.getStudentsHours   = getStudentsHours;
    vm.getCurrentProjects = getCurrentProjects;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);
    console.log('Profesor');

    function currentSectionsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.sections);
        vm.sectionsLoading = false;
        console.log(vm.sections);
        getStudents(719);
        //getCurrentProjects();
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
        vm.studentsLoading = false;
        console.log(vm.sectionStudents);
        getStudentsHours();
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
            getProjectsBySection(vm.sections[section].Id);
        }
    }

    function getProjectsBySection(sectionId) {
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