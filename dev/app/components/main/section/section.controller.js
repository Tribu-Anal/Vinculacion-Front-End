SectionController.$inject = ['$rootScope', '$stateParams', '$state',
    'TbUtils', 'ModalService', 'sections', 'projects', 'tableBuilder',
    'hours', 'tableContent', 'students'
];

function SectionController($rootScope, $stateParams, $state,
    TbUtils, ModalService, sections, projects, tableBuilder,
    hours, tableContent, students) {

    const vm = this,
        sectionData = require('./section-data');

    var modalFlag = '';

    vm.sectionLoading = true;
    vm.projectsLoading = true;
    vm.hoursLoading = true;
    vm.studentsLoading = true;
    vm.addStudent = addStudent;
    vm.accountId = null;
    vm.sections = [];
    vm.sectionhours = null;
    vm.editSection = editSection;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.evalProjectBtn = {
        icon: 'glyphicon glyphicon-list-alt',
        onClick: goToProjectEval,
        tooltip: 'Evaluar Proyecto'
    };
    vm.deleteRowButton = {
        icon: 'glyphicon-trash',
        onClick: deleteStudent,
        tooltip: 'Eliminar Alumno'
    };

    vm.student = undefined;

    sections.getSection($stateParams.sectionId, getSectionSuccess, getSectionFail);
    getProjectsBySection($stateParams.sectionId);
    students.getAccountId(getAccountIdSuccess, getAccountIdFail);

    function getAccountIdSuccess(response){
      vm.accountId = response.data.AccountId;
      students.getSectionHours(vm.accountId, getSectionHoursSuccess, getSectionHoursFail);
    }

    function getAccountIdFail(response){
      vm.hoursLoading = false;
      TbUtils.displayNotification('error', 'Error!',
          'No se ha podido cargar la seccion correctamente');
    }

    function getSectionHoursSuccess(response){
      vm.sections = response.data;
      for(obj in vm.sections){
        if($stateParams.sectionId == vm.sections[obj].Id){
          vm.sectionhours = vm.sections[obj].HoursWorked;
        }
      }
      vm.hoursLoading = false;
    }

    function getSectionHoursFail(response){
      vm.hoursLoading = false;
      TbUtils.displayNotification('error', 'Error!',
          'No se ha podido cargar las horas correspondientes de la seccion');
    }

    function goToProjectEval(project) {
        TbUtils.preventGeneralLoading();
        $state.go('main.evaluateproject', {
            projectId: project.data.Id
        });
    }

    function getProjectsBySection(sectionId) {
        sections.getProjects(sectionId, getProjectsSuccess, getProjectsFail);
    }

    function getProjectsSuccess(response) {
        const headers = ['Id Proyecto', 'Nombre'];

        for(prj in response.data) {
            response.data[prj].sectionId = $stateParams.sectionId;
        }

        vm.projectsTable = tableBuilder.newTable(headers, response.data, ['ProjectId', 'Name']);
        vm.projectsLoading = false;
    }

    function getProjectsFail(response) {
        vm.projectsLoading = false;
        TbUtils.displayNotification('error', 'Error!',
            'No se ha podido cargar los proyectos de la seccion');
    }

    function addStudent() {
        modalFlag = 'AddStudent';
        ModalService.showModal(sectionData.addStudentModal)
            .then(modalResolve);
    }

    function editSection() {
        modalFlag = 'EditSection';

        const params = {
            Code: vm.section.Code,
            ClassId: String(vm.section.Class.Id),
            PeriodId: String(vm.section.Period.Id),
            ProffesorAccountId: vm.section.User === null ? '' : vm.section.User.AccountId
        };

        TbUtils.setModalParams(params);
        ModalService.showModal(sectionData.editSectionModal)
            .then(modalResolve);
    }

    function modalResolve(modal) {
        modal.element.modal();
        modal.close.then(modalClose);
    }

    function modalClose(result) {
        if (modalFlag === 'AddStudent')
            addStudentToSection(result);
        else if (modalFlag === 'EditSection')
            updateSection(result);
        else
            deleteSection(result);
    }

    function addStudentToSection(result) {
        if (result.numCuenta > 0)
            sections.addStudent([result.numCuenta], vm.section.Id,
                addStudentSuccess, addStudentFail);
    }

    function updateSection(result) {
        if (result.ClassId)
            sections.updateSection(result, vm.section.Id,
                updateSectionSuccess, updateSectionFail);
    }

    function addStudentSuccess(response) {
        location.reload();
    }

    function addStudentFail(response) {
        TbUtils.showErrorMessage('error', response,
            'No se ha podido agregar el estudiante', 'Error');
    }

    function getStudentsSuccess(response) {
        if (response.data.length <= 0) {
            vm.studentsLoading = false;
            return;
        }

        vm.studentsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre', 'Horas en la Seccion']);
        vm.studentsTable.actions = false;

        if ($rootScope.Role !== 'Student')
            vm.studentsTable.headers.push('');

        for (let i = 0; i < response.data.length; i++) {
            let student = response.data[i];
            let element = {
                data: student,
                content: [
                    tableContent.createALableElement(student.User.AccountId),
                    tableContent.createALableElement(student.User.Name),
                    tableContent.createALableElement(!student.Hours ? '0' : student.Hours)
                ]
            }

            if ($rootScope.Role !== 'Student') {
                element.content.push(
                    tableContent.createAButtonElement(vm.deleteRowButton)
                );
            }
            vm.studentsTable.body.push(element);
        }
        vm.studentsLoading = false;
    }

    function getStudentsFail(response) {
        vm.studentsLoading = false;
        TbUtils.showErrorMessage('error', response.data, 'Error',
            'No se ha podido obtener los estudiantes de la seccion.');
    }

    function deleteStudent(student) {
        TbUtils.confirm('Eliminar Estudiante', `Desea eliminar a ${student.data.Name} de la seccion?`, result => {
            if (result) {
                vm.student = student;
                sections.removeStudent([student.data.AccountId], vm.section.Id,
                    removeStudentSuccess, removeStudentFail);
            }
        });
    }

    function removeStudentSuccess(response) {
        let index = vm.studentsTable.body.indexOf(vm.student);
        vm.studentsTable.body.splice(index, 1);
    }

    function removeStudentFail(response) {
        TbUtils.showErrorMessage('error', response.data,
            'No se ha podido eliminar al estudiante', 'Error');
    }

    function updateSectionSuccess(response) {
        sections.getSection(vm.section.Id, getSectionSuccess, getSectionFail);
        location.reload();
    }

    function getSectionSuccess(response) {
        vm.sectionLoading = false;
        vm.section = response.data;
        sections.getStudentsHoursBySectionId(vm.section.Id, getStudentsSuccess, getStudentsFail);
    }

    function getSectionFail(response) {
        vm.sectionLoading = false;
        TbUtils.showErrorMessage('error', response.data, 'Error',
            'No se ha podido obtener las secciones.');
    }

    function updateSectionFail(response) {
        TbUtils.showErrorMessage('error', response.data,
            'No se ha podido editar la seccion', 'Error');
    }

    /*
        TODO: Mejorar lo del controlador
    */
    function dialogController($scope, $mdDialog, sections) {
        $scope.projects = [];
        $scope.response = {
            projectId: '',
            hours: ''
        }

        $scope.answer = function(response) {
            $mdDialog.hide(response);
        }

        sections.getProjects($stateParams.sectionId, function(response) {
            if (response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    let project = response.data[i];
                    let element = {
                        Id: project.Id,
                        Name: TbUtils.toTitleCase(project.Name)
                    }
                    $scope.projects.push(element);
                }
            }
        }, function(err) {
        TbUtils.showErrorMessage('error', response.data,
            'No se ha podido editar la seccion', 'Error');
        });
    }
}

module.exports = {
    name: 'SectionController',
    ctrl: SectionController
};
