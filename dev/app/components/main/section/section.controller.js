SectionController.$inject = ['$rootScope', '$stateParams', '$state',
    'TbUtils', 'tableContent', 'ModalService',
    'sections'
];

function SectionController($rootScope, $stateParams, $state,
    TbUtils, tableContent, ModalService,
    sections) {

    var vm = this;

    var confirmSectionDeleteModal = {
        templateUrl: 'templates/components/main/section/dialogs/' +
            'confirm-section-delete/confirm-section-delete.html',
        controller: 'ConfirmSectionDeleteController'
    };

    var addStudentModal = {
        templateUrl: 'templates/components/main/section/dialogs/' +
            'add-student/add-student.html',
        controller: 'AddStudentController'
    };

    var editSectionModal = {
        templateUrl: 'templates/components/main/section/dialogs/' +
            'edit-section/edit-section.html',
        controller: 'EditSectionController as vm'
    }

    var modalFlag = '';

    vm.sectionsLoading = true;
    vm.sectionsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre']);
    updateSectionTableHeaders()
    vm.removeSection = removeSection;
    vm.addStudent = addStudent;
    vm.editSection = editSection;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.deleteRowButton = {
        icon: 'glyphicon-trash',
        onClick: deleteStudent,
        tooltip: 'Eliminar Alumno'
    };
    vm.downloadButton = {
        icon: 'glyphicon-file',
        onClick: downloadReport,
        tooltip: 'Ver Reporte'
    };
    vm.student = undefined;

    console.log($stateParams);
    sections.getSection($stateParams.sectionId, getSectionSuccess, getSectionFail);

    function addStudent() {
        modalFlag = 'AddStudent';
        ModalService.showModal(addStudentModal)
            .then(modalResolve);
    }

    function editSection() {
        modalFlag = 'EditSection';
        let params = {
            Code: vm.section.Code,
            ClassId: String(vm.section.Class.Id),
            PeriodId: String(vm.section.Period.Id),
            ProffesorAccountId: vm.section.User === null ? '' : vm.section.User.AccountId
        }
        TbUtils.setModalParams(params);
        ModalService.showModal(editSectionModal)
            .then(modalResolve);
    }

    function removeSection() {
        modalFlag = 'DeleteSection';
        ModalService.showModal(confirmSectionDeleteModal)
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

    function deleteSection(result) {
        if (result)
            sections.deleteSection(vm.section.Id,
                deleteSectionSuccess, deleteSectionFail)
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

    function deleteSectionSuccess() {
        $state.go('main.sections');
    }

    function deleteSectionFail(response) {
        console.log(response);
        TbUtils.showErrorMessage('error', response.data,
            'No se ha podido borrar la seccion.', 'Error');
    }

    function getStudentsSuccess(response) {
        if (response.data.length <= 0) {
            vm.sectionsLoading = false;
            return;
        }
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
            let section = response.data[i];
            console.log(section);
            let newTableElement = {
                content: [
                    tableContent.createALableElement(section.AccountId),
                    tableContent.createALableElement(section.Name)
                ],
                data: section
            };
            if ($rootScope.Role !== 'Student')
                newTableElement.content.push(
                    tableContent.createAButtonElement(vm.deleteRowButton));
            if ($rootScope.Role !== 'Student' || section.Id === $rootScope.globals.id)
                newTableElement.content.push(
                    tableContent.createAButtonElement(vm.downloadButton));
            vm.sectionsTable.body.push(newTableElement);
        }

        vm.sectionsLoading = false;
    }

    function getStudentsFail(response) {
        TbUtils.showErrorMessage('error', response.data, 'Error',
            'No se ha podido obtener los estudiantes de la seccion.');
    }

    function deleteStudent(student) {
        vm.student = student;
        sections.removeStudent([student.data.AccountId], vm.section.Id,
            removeStudentSuccess, removeStudentFail);
    }

    function removeStudentSuccess(response) {
        let index = vm.sectionsTable.body.indexOf(vm.student);
        vm.sectionsTable.body.splice(index, 1);
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
        sections.getStudents(vm.section.Id, getStudentsSuccess, getStudentsFail);
        console.log(vm.section);
    }

    function getSectionFail(response) {
        console.log(response);
    }

    function updateSectionFail(response) {
        TbUtils.showErrorMessage('error', response,
            'No se ha podido editar la seccion', 'Error');
    }

    function getReportParams(participant) {
        let reportParams = {
            AccountId: participant.AccountId,
            Campus: participant.Campus,
            Major: participant.Major.Name,
            Name: participant.Name
        }
        return reportParams;
    }

    function downloadReport(participant) {
        let params = {
            reportParams: getReportParams(participant.data)
        }
        TbUtils.preventGeneralLoading();
        $state.go('main.student-project-pdf', {
            data: params
        });
    }

    function updateSectionTableHeaders(){
        if ($rootScope.Role !== 'Student')
            vm.sectionsTable.headers.push('Eliminar Alumno');
        vm.sectionsTable.headers.push('Ver Reporte');
    }
}

module.exports = {
    name: 'SectionController',
    ctrl: SectionController
};
