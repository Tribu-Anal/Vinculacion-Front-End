ProfessorDashboardController.$inject = ['$rootScope', '$stateParams', 'TbUtils', 
    'sections', 'students', 'tableContent'];

function ProfessorDashboardController($rootScope, $stateParams, TbUtils, sections, students, tableContent) {
    var vm = this;

    vm.sections        = [];
    // vm.sectionStudents = [];
    // vm.studentHours    = [];
    vm.currentProjects = [];
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo']);
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.sectionsLoading        = true;
    //vm.studentsLoading        = true;
    // vm.studentsHoursLoading   = true;
    // vm.currentProjectsLoading = true;

    // vm.getStudents        = getStudents;
    // vm.getStudentsHours   = getStudentsHours;
    vm.getCurrentProjects = getCurrentProjects;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);
    console.log('Profesor');

    function currentSectionsSuccess(response) {
        if (response.data.length <= 0)
            return;

        for (let i = 0; i < response.data.length; i++) {
            let section = response.data[i];
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

        vm.sectionsLoading = false;
    }

    function currentSectionsFail(response) {
        console.log(response);
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
    }

    function getClassName(section) {
        return section.Class.Name
    }

    function getPeriod(section) {
        return section.Period.Number + " - " + section.Period.Year
    }

    // function getStudents(sectionId) {
    //     sections.getStudents(sectionId, getStudentsSuccess, getStudentsFail);
    // }

    // function getStudentsSuccess(response) {
    //     vm.sectionStudents = [];
    //     TbUtils.fillListWithResponseData(response.data, vm.sectionStudents);
    //     vm.studentsLoading = false;
    //     console.log(vm.sectionStudents);
    //     getStudentsHours();
    // }

    // function getStudentsFail(response) {
    //     console.log(response);
    // }

    // function getStudentsHours() {
    //     vm.studentHours = [];

    //     for(student in vm.sectionStudents) {
    //         students.getHours(vm.sectionStudents[student].AccountId, HoursSuccess, HoursFail);
    //     }
    // }

    // function HoursSuccess(response) {
    //     vm.studentHours.push(response.data);
    //     console.log(vm.studentHours);
    // }

    // function HoursFail(response) {
    //     console.log(response);
    // }

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
        for(prj in response.data) {
            if(!findDuplicatesProjects(response.data[prj].Id))
                vm.currentProjects.push(response.data[prj]);
        }
        console.log(vm.currentProjects);
    }

    function getProjectsFail(response) {
        console.log(response);
    }

    function findDuplicatesProjects(projectId) {
        for(prj in vm.currentProjects) {
            if(projectId === vm.currentProjects[prj].Id) return true;
        }

        return false;
    }
}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };