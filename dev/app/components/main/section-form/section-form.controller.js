SectionFormController.$inject = ['$rootScope', '$state', 'TbUtils', 'sections', 'sectionData',
    'projects', '$q', '$timeout', 'students', 'ModalService', 'professors', 'sectionProjects'
];

function SectionFormController($rootScope, $state, TbUtils, sections, sectionData, projects, q,
    timeout, students, ModalService, professors, sectionProjects) {

    var vm = this;

    vm.classes = [];
    vm.professors = [];
    vm.periods = [];
    vm.projects = [];
    vm.students = [];
    vm.sectionStudents = [];
    vm.classesLoading = true;
    vm.professorsLoading = true;
    vm.periodsLoading = true;
    vm.studentsLoading = true;
    vm.submitting = false;

    vm.selectedProjects = [];
    vm.projectsTableSchema = require('../../../table-schemas/form-projects-table-schema');
    vm.removeProject = removeProject;

    vm.studentsTableSchema = require('../../../table-schemas/form-students-table-schema');
    vm.removeStudent = removeStudent;
    vm.addStudent = addStudent;

    vm.section = {
        projectIds: []
    };
    vm.submit = submit;
    vm.queryStudents = queryStudents;
    vm.simulateQuery = false;
    // vm.addStudentToSection = addStudentToSection;
    vm.addProjects = addProjects;
    vm.professorActive = $rootScope.Role === 'Professor';
    projects.selectedProjectsInSectionForm = [];

    var addProjectsModal = {
        templateUrl: 'templates/components/main/section-form/dialogs/' +
            'add-projects/add-projects.html',
        controller: 'AddProjectsController as vm'
    }

    getClasses();
    getProjects();
    getStudents();

    if (vm.professorActive) 
        professors.getActiveProfessor($rootScope.ProfessorDBId, getProfessorSuccess, getProfessorFail);
    else getProfessors();

    function removeProject (project) {
        vm.section.projectIds.splice(vm.section.projectIds.indexOf(project.Id), 1);
        vm.selectedProjects.splice(vm.selectedProjects.indexOf(project), 1);
        projects.selectedProjectsInSectionForm = vm.selectedProjects;
    }

    function removeStudent (student) {
        vm.sectionStudents.splice(vm.sectionStudents.indexOf(student), 1);
    }

    function addStudent () {
        if (vm.selectedItem && !isAlreadyOnList(vm.selectedItem.AccountId)) {
            vm.sectionStudents.push(vm.selectedItem);
            vm.searchText = "";
        }
    }

    function submit() {
        vm.submitting = true;
        sections.postSection(vm.section, submitSuccess, submitFailure);
    }

    function getProfessorSuccess(response) {
        vm.section.ProffesorAccountId = response.data[0].AccountId;
    }

    function getProfessorFail(response) {

    }

    function submitSuccess(response) {
        addStudentsToSection(response.data.Id);

        projects.assignProjectstoSection(vm.section.projectIds,
            response.data.Id,
            assignSectionToProjectSuccess,
            assignSectionToProjectError);

        let sectionProjectObj = {
            SectiontId: response.data.Id,
            ProjectIds: vm.section.projectIds,
            Description: vm.section.Description,
            Cost: vm.section.Cost
        };

        sectionProjects.postSectionProjects(sectionProjectObj, resp => {}, resp => {});
    }

    function submitFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'Han habido problemas al crear la seccion.');
        vm.submitting = false;

    }

    function addProjects() {
        ModalService.showModal(addProjectsModal)
            .then(modalResolve);
    }

    function modalResolve(modal) {
        modal.element.modal();
        modal.close.then(selectProjects);
    }

    function selectProjects (projects) {
        vm.selectedProjects = projects;
        projects.selectedProjectsInSectionForm = vm.selectedProjects;

        vm.section.projectIds = [];

        for (let prj in projects)
            vm.section.projectIds.push(projects[prj].Id);
    }

    function getClasses() {
        sectionData.getClasses(getClassesSuccess, getClassesFailure);
    }

    function getClassesSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.classes);
        vm.classesLoading = false;
    }

    function getClassesFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las clases.');
        vm.classesLoading = false;
    }

    function getProfessors() {
        sectionData.getProfessors(getProfessorsSuccess, getProfessorsFailure);
    }

    function getProfessorsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.professors);
        vm.professorsLoading = false;
    }

    function getProfessorsFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los profesores.');
        vm.professorsLoading = false;
    }

    function getAccountID(bodyIndex) {
        return vm.studentsTable.body[bodyIndex].content[0].properties.value;
    }

    function addStudentsToSection(sectionId) {
        const students = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            students.push(getAccountID(i));
        }
        sections.addStudent(students, sectionId, addStudentSuccess, submitFailure);
    }

    function addStudentSuccess() {
        TbUtils.displayNotification('success', 'Seccion Creada',
            'La seccion se creo exitosamente.');
        $state.go('main.sections');
        vm.submitting = false;
    }

    function getProjects() {
        projects.getProjectsWithPagination(0, 60, getProjectsSuccess, getProjectsError);
    }

    function getProjectsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.projects);
        vm.professorsLoading = false;
    }

    function getProjectsError(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los proyectos.');
        vm.professorsLoading = false;
    }

    function assignSectionToProjectSuccess(response) {

    }

    function assignSectionToProjectError() {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron guardar el proyecto.');
        vm.professorsLoading = false;
    }

    function getStudents() {
        students.get(response => {
            TbUtils.fillListWithResponseData(response.data, vm.students);
            vm.studentsLoading = false;
        }, response => {
            TbUtils.displayNotification('error', 'Error', 'No se pudieron cargar los estudiantes.' +
                ' Intenta resfrescando la pagina.');
        });
    }

    function queryStudents(searchText) {
        let results = searchText ? vm.students.filter(createFilterFor(searchText)) : vm.students,
            deferred;
        if (vm.simulateQuery) {
            deferred = q.defer();
            timeout(function() {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item.AccountId.indexOf(lowercaseQuery) === 0);
        };
    }

    function isAlreadyOnList(accountId) {
        for (let i = 0; i < vm.sectionStudents.length; i++) {
            const student = vm.sectionStudents[i];
            if (student.AccountId === accountId)
                return true;
        }

        return false;
    }

}

module.exports = {
    name: 'SectionFormController',
    ctrl: SectionFormController
};