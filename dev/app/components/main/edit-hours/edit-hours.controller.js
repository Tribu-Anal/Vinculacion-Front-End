EditHoursController.$inject = ['$stateParams', 'sections', 'projects',
    'TbUtils', '$rootScope', 'hours', '$mdDialog', 'students'
];

function EditHoursController($stateParams, sections, projects,
    TbUtils, $rootScope, hours, $mdDialog, students) {
    const vm = this;

    vm.participantsLoading = true;
    vm.editHours = {
        visible: $rootScope.Role === 'Professor',
        value: false,
        text: 'Habilitar la edición de las horas'
    };
    vm.evaluateProject = evaluateProject;
    vm.projectName = null;
    vm.students = [];
    vm.table = undefined;
    vm.tableSchema = require('../../../table-schemas/edit-hours-table-schema');
    vm.saveChanges = saveChanges;

    sections.getStudentsHoursBySectionProjectId($stateParams.sectionId, 
                                                $stateParams.projectId, 
                                                getStudentsHoursSuccess, 
                                                getStudentsHoursFail);

    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);

    function getStudentsHoursSuccess(response) {
        vm.students = reponse.data;
        vm.participantsLoading = false;
    }

    function getStudentsHoursFail() {
        vm.participantsLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente.');
    }

    function getProjectSuccess(response) {
        vm.projectName = TbUtils.toTitleCase(response.data.Name);
    }

    function getProjectFail(response) {
        TbUtils.displayNotification('error', 'Error', 'No se pudieron cargar los datos.');
    }

    function evaluateProject() {
        TbUtils.go('main.evaluateproject', { projectId: $stateParams.projectId });
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
        let obj = {
            ProjectId: parseInt($stateParams.projectId),
            SectionId: parseInt($stateParams.sectionId),
            StudentsHour: getStudentsHours()
        };
        hours.postHours(obj, postHoursSuccess, postHoursFail);
    }

    function postHoursFail(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron registrar las horas');
    }

    function postHoursSuccess() {
        TbUtils.displayNotification('success', 'Exitoso',
            'Horas registradas exitosamente.');
        vm.editHours.value = false;
        location.reload()
    }
}

module.exports = {
    name: 'EditHoursController',
    ctrl: EditHoursController
};
