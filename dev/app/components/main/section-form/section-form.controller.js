SectionFormController.$inject = ['$rootScope', '$state', 'TbUtils', 'sections', 'sectionData',
    'tableContent', 'projects', '$q', '$timeout', 'students'
];

function SectionFormController ($rootScope, $state, TbUtils, sections, sectionData, tableContent, projects, q, timeout, students) {
    if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('main.projects');

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
    vm.section = {};
    vm.submit = submit;
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre']);
    vm.queryStudents = queryStudents;
    vm.simulateQuery = false;
    vm.addStudentToSection = addStudentToSection;
    vm.deleteElementFromStudentsTable = deleteElementFromStudentsTable;

    getClasses();
    getProfessors();
    getPeriods();
    getProjects();
    getStudents();

    function submit() {
        vm.submitting = true;

        sections.postSection(vm.section,
            submitSuccess, submitFailure);
    }

    function submitSuccess(response) {
        addStudentsToSection(response.data.Id);
        projects.assignSectionToProject(vm.section.ProjectId,
            response.data.Id,
            assignSectionToProjectSuccess,
            assignSectionToProjectError)
    }

    function submitFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'Han habido problemas al crear la seccion.');
        vm.submitting = false;
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

    function getPeriods() {
        sectionData.getPeriods(getPeriodsSuccess, getPeriodsFailure);
    }

    function getPeriodsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.periods);
        vm.periodsLoading = false;
    }

    function getPeriodsFailure(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los periodos.');
        vm.periodsLoading = false;
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
    }

    function getProjectsError(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los proyectos.');
        vm.professorsLoading = false;
    }
    function assignSectionToProjectSuccess(response){
        console.log(response.data);
    }

    function assignSectionToProjectError(){
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron guardar el proyecto.');
        vm.professorsLoading = false;
    }

    function getStudents () {
        students.get(response => {
            TbUtils.fillListWithResponseData(response.data, vm.students);
            vm.studentsLoading = false;
        }, response => {
            TbUtils.displayNotification('error', 'Error', 'No se pudieron cargar los estudiantes.' + 
                                        ' Intenta resfrescando la pagina.');
        });
    }

    function queryStudents (searchText) {
        let results = searchText ? vm.students.filter( createFilterFor(searchText) ) : vm.students,
          deferred;
          if (vm.simulateQuery) {
            deferred = q.defer();
            timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
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

    function addStudentToSection () {
        console.log(vm.selectedItem);
        if (vm.selectedItem && !isAlreadyOnList(vm.selectedItem.AccountId)) {
            vm.sectionStudents.push(vm.selectedItem);
            const element = {
                content: [
                    tableContent.createALableElement(vm.selectedItem.AccountId),
                    tableContent.createALableElement(vm.selectedItem.Name)
                ],
                data: vm.selectedItem
            };
            vm.studentsTable.body.push(element);
            vm.searchText = "";
        }
    }

    function isAlreadyOnList (accountId) {
        for (let i = 0; i < vm.sectionStudents.length; i++) {
            const student = vm.sectionStudents[i];
            if (student.AccountId === accountId) 
                return true;
        }

        return false;
    }

    function deleteElementFromStudentsTable (element) {
        const index = vm.studentsTable.body.indexOf(element);
        vm.studentsTable.body.splice(index, 1);
        vm.sectionStudents.splice(index, 1);
    }

}

module.exports = { name: 'SectionFormController', ctrl: SectionFormController };