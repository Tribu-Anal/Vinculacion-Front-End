SectionController.$inject = ['$rootScope', '$stateParams', '$state',
    'TbUtils', 'ModalService', 'sections', 'projects', 'tableBuilder',
    'hours', 'tableContent'
];

function SectionController($rootScope, $stateParams, $state,
    TbUtils, ModalService, sections, projects, tableBuilder,
    hours, tableContent) {

    const vm = this,
        sectionData = require('./section-data');

    var modalFlag = '';

    vm.sectionsLoading = true;
    vm.addStudent = addStudent;
    vm.editSection = editSection;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.editHoursBtn = {
        icon: 'glyphicon glyphicon-pencil',
        onClick: editHours,
        tooltip: 'Editar Horas'
    };
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

    function editHours(student) {
        TbUtils.customDialog(dialogController,
            'templates/components/main/section/dialogs/edit-hours.html',
            result => {
                if (result) {
                    let obj = {
                        AccountId: student.data.User.AccountId,
                        SectionId: parseInt($stateParams.sectionId),
                        ProjectId: parseInt(result.projectId),
                        Hour: result.hours
                    };
                    hours.postHours(obj, postHoursSuccess, postHoursFail);
                }
            });
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
        let buttons = undefined;

        if ($rootScope.Role === 'Professor') {
            headers.push('Evaluar Proyecto');
            buttons = [vm.evalProjectBtn];
        }

        vm.projectsTable = tableBuilder.newTable(headers, response.data, ['ProjectId', 'Name'], buttons);
    }

    function getProjectsFail(response) {
        console.log(response);
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
        console.log(response);
        TbUtils.showErrorMessage('error', response,
            'No se ha podido agregar el estudiante', 'Error');
    }

    function getStudentsSuccess(response) {
        if (response.data.length <= 0) {
            vm.sectionsLoading = false;
            return;
        }

        vm.studentsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre', 'Horas']);
        vm.studentsTable.actions = false;
        if ($rootScope.Role === 'Professor') {
            vm.studentsTable.headers.push('Editar Horas');
        }
        if ($rootScope.Role !== 'Student')
            vm.studentsTable.headers.push('');
        for (let i = 0; i < response.data.length; i++) {
            let student = response.data[i];
            let element = {
                data: student,
                content: [
                    tableContent.createALableElement(student.User.AccountId),
                    tableContent.createALableElement(student.User.Name),
                    tableContent.createALableElement(student.Hours)
                ]
            }
            if ($rootScope.Role === 'Professor') {
                element.content.push(
                    tableContent.createAButtonElement(vm.editHoursBtn)
                );
            }
            if ($rootScope.Role !== 'Student') {
                element.content.push(
                    tableContent.createAButtonElement(vm.deleteRowButton)
                );
            }
            vm.studentsTable.body.push(element);
        }
        vm.sectionsLoading = false;
    }

    function getStudentsFail(response) {
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
        TbUtils.showErrorMessage('error', response,
            'No se ha podido eliminar al estudiante', 'Error');
    }

    function updateSectionSuccess(response) {
        sections.getSection(vm.section.Id, getSectionSuccess, getSectionFail);
        location.reload();
    }

    function getSectionSuccess(response) {
        vm.section = response.data;
        sections.getStudentsHoursBySectionId(vm.section.Id, getStudentsSuccess, getStudentsFail);
    }

    function getSectionFail(response) {
        console.log(response);
    }

    function updateSectionFail(response) {
        TbUtils.showErrorMessage('error', response,
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
            console.log(err);
        });
    }

    function postHoursFail(response) {
        console.log(response);
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron registrar las horas');
    }

    function postHoursSuccess() {
        TbUtils.displayNotification('success', 'Exitoso',
            'Horas registradas exitosamente.');
        location.reload();
    }

}

module.exports = {
    name: 'SectionController',
    ctrl: SectionController
};