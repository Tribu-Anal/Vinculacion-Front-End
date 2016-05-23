(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionController', SectionController);

    SectionController.$inject = ['$rootScope', '$stateParams', '$state', 'TbUtils',
        'tableContent', 'ModalService', 'sections'
    ];

    function SectionController($rootScope, $stateParams, $state, TbUtils, tableContent, ModalService, sections) {
        if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('dashboard.home');

        var vm = this;

        var confirmDeleteModal = {
            templateUrl: 'templates/components/main/section/' +
                'confirm-delete/confirm-delete.html',
            controller: 'ConfirmDeleteController'
        };

        var addStudentModal = {
            templateUrl: 'templates/components/main/section/' +
                'add-student/add-student.html',
            controller: 'AddStudentController'
        };

        var modalFlag = '';

        vm.sectionsLoading = true;
        vm.section = JSON.parse($stateParams.data);
        vm.sectionsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre',' ']);
        vm.removeSection = removeSection;
        vm.addStudent = addStudent;
        vm.deleteRowButton = {
            icon: 'glyphicon-trash',
            onClick: deleteStudent,
            tooltip: 'Eliminar Alumno'
        };

        if (!$stateParams.data) {
            $state.go('dashboard.sections');
        } else {
            sections.getStudents(vm.section.Id, getStudentsSuccess, getStudentsFail);
        }

        function addStudent() {
            modalFlag = 'AddStudent';
            ModalService.showModal(addStudentModal)
                .then(modalResolve);
        }

        function removeSection() {
            modalFlag = 'DeleteSection';
            ModalService.showModal(confirmDeleteModal)
                .then(modalResolve);
        }

        function modalResolve(modal) {
            modal.element.modal();
            modal.close.then(modalClose);
        }

        function modalClose(result) {
            if (modalFlag === 'AddStudent')
                addStudentToSection(result);
            else
                deleteSection(result);
        }

        function addStudentToSection(result) {
            if (result.numCuenta > 0)
                sections.addStudent([result.numCuenta], vm.section.Id, addStudentSuccess, addStudentFail);
        }

        function deleteSection(result) {
            if (result)
                sections.deleteSection(vm.section.Id, deleteSectionSuccess, deleteSectionFail)
        }

        function addStudentSuccess(response) {
            TbUtils.showErrorMessage('success', response, 'Estudiante agregado exitosamente', 'Exito');
            $state.go('dashboard.sections');
        }

        function addStudentFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response, 'No se ha podido agregar el estudiante', 'Error');
        }

        function deleteSectionSuccess() {
            $state.go('dashboard.sections');
        }

        function deleteSectionFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response.data, 'No se ha podido borrar la seccion.', 'Error');
        }

        function getStudentsSuccess(response) {
            console.log(response);
            if (response.data.length <= 0) {
                vm.sectionsLoading = false;
                return;
            }

            for (let i = 0; i < response.data.length; i++) {
                let section = response.data[i];

                let newTableElement = {
                    content: [
                        tableContent.createALableElement(section.AccountId),
                        tableContent.createALableElement(section.Name),
                        tableContent.createAButtonElement(vm.deleteRowButton)
                    ],
                    data: section
                };

                vm.sectionsTable.body.push(newTableElement);
            }

            vm.sectionsLoading = false;
        }

        function getStudentsFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response.data, 'Error',
                'No se ha podido obtener los estudiantes de la seccion.');
        }

        function deleteStudent(student){
            sections.removeStudent([student.data.AccountId], vm.section.Id, removeStudentSuccess, removeStudentFail);
        }

        function removeStudentSuccess(response) {
            TbUtils.showErrorMessage('success', response, 'Estudiante eliminado exitosamente', 'Exito');
            $state.go('dashboard.sections');
        }

         function removeStudentFail(response) {
            TbUtils.showErrorMessage('error', response, 'No se ha podido eliminar al estudiante', 'Error');
        }
    }
})();