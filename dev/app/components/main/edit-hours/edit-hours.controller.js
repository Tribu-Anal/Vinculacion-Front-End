EditHoursController.$inject = ['$stateParams', 'sections', 'projects',
    'TbUtils', '$rootScope', 'hours', '$mdDialog', 'students', 'sectionProjects'
];

function EditHoursController($stateParams, sections, projects,
    TbUtils, $rootScope, hours, $mdDialog, students, sectionProjects) {
    const vm = this;

    vm.participantsLoading = true;
    vm.projectLoading      = true;
    vm.loadingProjectInfo  = true;
    vm.postingHours        = false;

    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
    vm.editHours = {
        visible: $rootScope.Role !== 'Student',
        value: false,
        text: 'Habilitar la edición de las horas'
    };
    vm.evaluateProject = evaluateProject;

    vm.isApproved = false;
    vm.cost = 0;
    vm.projectName = null;
    vm.description = null;
    vm.students = [];
    vm.table = undefined;
    vm.tableSchema = require('../../../table-schemas/edit-hours-table-schema')(vm.isApproved);
    vm.saveChanges = saveChanges;

    sections.getStudentsHoursBySectionProjectId($stateParams.sectionId, 
                                                $stateParams.projectId, 
                                                getStudentsHoursSuccess, 
                                                getStudentsHoursFail);

    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);

    sectionProjects.getSectionProject($stateParams.sectionId, $stateParams.projectId, 
                                      getSectionProjectSuccess, getSectionProjectFail);

    function getStudentsHoursSuccess(response) {
        vm.students = response.data.Hours;

        vm.isApproved = response.data.IsApproved;

        if (vm.students.length <= 0) {
            TbUtils.displayNotification('error', 'Error',
                'Esta sección y proyecto no tienen alumnos asginados.');
            TbUtils.go('main.section', { sectionId: $stateParams.sectionId });
            return;
        }

        if(vm.isApproved)
            TbUtils.displayNotification('warning', 'Aviso', 
                'Las horas de esta sección ya fueron aprobadas.');

        vm.participantsLoading = false;
    }

    function getStudentsHoursFail(response) {
        vm.participantsLoading = false;
        TbUtils.showErrorMessage(response);
    }

    function getProjectSuccess(response) {
        vm.projectName = TbUtils.toTitleCase(response.data.Name);
        vm.projectLoading = false;
    }
    
    function getProjectFail(response) {
        TbUtils.showErrorMessage(response);
        vm.projectLoading = false;
    }

    function getSectionProjectSuccess(response){
        vm.cost = response.data.Cost;
        vm.description = response.data.Description;
        vm.loadingProjectInfo = false;
    }

    function getSectionProjectFail(response){
        TbUtils.displayNotification('error', 'Error', 'No existe relacion entre seccion y proyecto.');
        vm.loadingProjectInfo = false;
    }

    function evaluateProject() {
        TbUtils.go('main.evaluate-project', 
            { projectId: $stateParams.projectId,
              sectionId: $stateParams.sectionId });
    }

    function getStudentsHours () {
        let reqData = [];
        for (let i = 0; i < vm.students.length; i++) {
            const student = vm.students[i];
            const obj = {
                AccountId: student.User.AccountId,
                HourId: student.Hours ? student.Hours.Id : -1,
                Hour:  vm.table.rows[i].elements[2].props.model
            };
            reqData.push(obj);
        }
        return reqData;
    }

    function saveChanges () {
        const confirm = $mdDialog.confirm()
            .title('¿Está seguro de que quiere registrar las horas?')
            .textContent('Está apunto de asignarle horas a los estudiantes de esta sección en este proyecto.')
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(result => {
            if (result)
                saveHours();
        });
    }

    function saveHours() {
        vm.postingHours = true;

        let obj = {
            ProjectId: parseInt($stateParams.projectId),
            SectionId: parseInt($stateParams.sectionId),
            StudentsHour: getStudentsHours()
        };
        hours.postHours(obj, postHoursSuccess, postHoursFail);
    }

    function postHoursSuccess() {
        TbUtils.displayNotification('success', 'Exitoso',
            'Horas registradas exitosamente.');
        vm.editHours.value = false;
        vm.postingHours = false;
        TbUtils.reload();
    }

    function postHoursFail(response) {
        TbUtils.showErrorMessage(response);
        vm.postingHours = false;
    }

}

module.exports = {
    name: 'EditHoursController',
    ctrl: EditHoursController
};
