SectionController.$inject = ['$rootScope', '$stateParams', '$state',
    'TbUtils', 'tableContent', 'ModalService', 'sections', 'projects',
    'tableBuilder'
];

function SectionController($rootScope, $stateParams, $state,
    TbUtils, tableContent, ModalService, sections, projects,
    tableBuilder) {

    const vm          = this,
          sectionData = require('./section-data');

    var modalFlag = '';

    vm.sectionsLoading = true;
    vm.addStudent = addStudent;
    vm.editSection = editSection;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.deleteRowButton = {
        icon: 'glyphicon-trash',
        onClick: deleteStudent,
        tooltip: 'Eliminar Alumno'
    };
    vm.student = undefined;

    console.log($stateParams);
    sections.getSection($stateParams.sectionId, getSectionSuccess, getSectionFail);
    getProjectsBySection($stateParams.sectionId)

    function getProjectsBySection(sectionId) {
        sections.getProjects(sectionId, getProjectsSuccess, getProjectsFail);
    }

    function getProjectsSuccess(response) {
        vm.projectsTable = tableBuilder.newTable(['Id Proyecto', 'Nombre'], response.data, ['ProjectId', 'Name']);
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
        console.log(response);

        vm.studentsTable = tableBuilder.newTable(['Numero de Cuenta', 'Nombre'], response.data, ['AccountId', 'Name']);
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

}

module.exports = {
    name: 'SectionController',
    ctrl: SectionController
};
