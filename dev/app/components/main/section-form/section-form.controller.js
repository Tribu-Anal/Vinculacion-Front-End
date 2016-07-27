SectionFormController.$inject = ['$rootScope', '$state', 'TbUtils', 'sections', 'sectionData',
    'tableContent', 'projects'
];

function SectionFormController ($rootScope, $state, TbUtils, sections, sectionData, tableContent, projects) {
    if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('main.projects');

    var vm = this;

    vm.classes = [];
    vm.professors = [];
    vm.periods = [];
    vm.projects = []
    vm.classesLoading = true;
    vm.professorsLoading = true;
    vm.periodsLoading = true;
    vm.submitting = false;
    vm.section = {};
    vm.submit = submit;
    vm.studentsSearch = {
        endpoint: "http://fiasps.unitec.edu:8085/api/Students?$top=2&$filter=startswith(AccountId , '{MODEL}')",
        onElementClick: studentsSearchClick,
        responsePropertyShow: 'Name'
    };
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre']);
    vm.deleteElementFromStudentsTable = deleteElementFromStudentsTable;

    getClasses();
    getProfessors();
    getPeriods();
    getProjects();

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

    function studentsSearchClick(elementList) {
        let studentData = elementList.data;
        if (checkIfStudentAlreadyAddedToTable(studentData.AccountId)) {
            return;
        }
        let element = {
            content: [
                tableContent.createALableElement(studentData.AccountId),
                tableContent.createALableElement(studentData.Name)
            ],
            data: studentData
        }
        addElementToStudentsTable(element);
    }

    function addElementToStudentsTable(element) {
        vm.studentsTable.body.push(element);
        console.log(element);
    }

    function deleteElementFromStudentsTable(element) {
        let index = vm.studentsTable.body.indexOf(element);
        vm.studentsTable.body.splice(index, 1);
    }

    function checkIfStudentAlreadyAddedToTable(accountId) {
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            if (getAccountID(i) === accountId)
                return true;
        }
        return false;
    }

    function getAccountID(bodyIndex) {
        return vm.studentsTable.body[bodyIndex].content[0].properties.value;
    }

    function addStudentsToSection(sectionId) {
        let students = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            students.push(getAccountID(i));
        }
        sections.addStudent(students, sectionId, addStudentSuccess, submitFailure);
    }

    function addStudentSuccess() {
        TbUtils.displayNotification('success', 'Seccion Creada',
            'La seccion se creo exitosamente.');
        $state.go('main.projects');
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
}

module.exports = { name: 'SectionFormController', ctrl: SectionFormController };