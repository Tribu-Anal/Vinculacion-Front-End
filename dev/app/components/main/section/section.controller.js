SectionController.$inject = ['$rootScope', '$stateParams', '$state',
    'TbUtils', 'ModalService', 'sections', 'projects',
    'hours', 'students'
];

function SectionController($rootScope, $stateParams, $state,
    TbUtils, ModalService, sections, projects, 
    hours, students) {

    const vm = this,
          sectionData = require('./section-data');

    var modalFlag = '';

    vm.sectionLoading = true;
    vm.projectsLoading = true;
    vm.studentsLoading = true;
    vm.addStudent = addStudent;
    vm.sections = [];
    vm.editSection = editSection;
    vm.toTitleCase = TbUtils.toTitleCase;
    vm.goToEditHours = project => { TbUtils.go('main.edit-hours', {projectId: project.Id, sectionId: $stateParams.sectionId}); };

    vm.student = undefined;

    vm.students = null;
    vm.studentsTableSchema = require('../../../table-schemas/section-students-table-schema')(deleteStudent);

    vm.projects = null;
    vm.projectsTableSchema = require('../../../table-schemas/section-projects-table-schema');

    sections.getSection($stateParams.sectionId, getSectionSuccess, getSectionFail);
    getProjectsBySection($stateParams.sectionId);

    function getProjectsBySection(sectionId) {
        sections.getProjects(sectionId, getProjectsSuccess, getProjectsFail);
    }

    function getProjectsSuccess(response) {
        for(prj in response.data) {
            response.data[prj].sectionId = $stateParams.sectionId;
        }
        vm.projects = response.data;
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
        vm.students = response.data;
        vm.studentsLoading = false;
    }

    function getStudentsFail(response) {
        vm.studentsLoading = false;
        TbUtils.showErrorMessage('error', response.data, 'Error',
            'No se ha podido obtener los estudiantes de la seccion.');
    }

    function deleteStudent(student) {
        TbUtils.confirm('Eliminar Estudiante', `Desea eliminar a ${student.Name} de la seccion?`, result => {
            if (result) {
                vm.student = student;
                sections.removeStudent([student.AccountId], vm.section.Id,
                    removeStudentSuccess, removeStudentFail);
            }
        });
    }

    function removeStudentSuccess(response) {
        vm.students.splice(vm.students.indexOf(vm.student), 1);
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
        sections.getStudents(vm.section.Id, getStudentsSuccess, getStudentsFail);
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

    }
}

module.exports = {
    name: 'SectionController',
    ctrl: SectionController
};
