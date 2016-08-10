EditHoursController.$inject = ['$stateParams', '$state', 'sections', 'projects',
    'TbUtils', 'tableContent', '$rootScope', 'hours', '$mdDialog', 'students'
];

function EditHoursController($stateParams, $state, sections, projects,
    TbUtils, tableContent, $rootScope, hours, $mdDialog, students) {
    const vm = this;
    console.log($stateParams.projectId);
    vm.participantsLoading = true;
    vm.editHours = {
        visible: $rootScope.Role === 'Professor',
        value: false,
        text: 'Habilitar la edición de las horas'
    }
    vm.evaluateProject = {
        onClick: evaluateProject
    }
    vm.projectName = null;
    vm.addHours = {
        onClick: addHours,
        icon: 'glyphicon-plus',
        tooltip: 'Agregar horas'
    }
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre', 'Horas en este proyecto']);
    sections.getStudentsHoursBySectionId($stateParams.sectionId, getStudentsHoursSuccess, getStudentsHoursFail);
    projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);

    function getStudentsHoursSuccess(response) {
        if (response.data.length <= 0)
            return;
        for (let i = 0; i < response.data.length; i++) {
            let student = response.data[i];
            let inputProperties = {
                value: student.Hours,
                type: 'number',
                min: 0,
                max: 100
            };
            let newTableElement = {
                content: [
                    tableContent.createALableElement(student.User.AccountId),
                    tableContent.createALableElement(student.User.Name),
                    tableContent.createAnInputElement(inputProperties)
                ],
                data: student
            };

            vm.studentsTable.body.push(newTableElement);
        }
        console.log(response);
        vm.participantsLoading = false;
    }

    function getStudentsHoursFail() {
        vm.participantsLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente.');
    }

    function getProjectSuccess(response) {
        vm.projectName = TbUtils.toTitleCase(response.data.Name);
        console.log(response);
    }

    function getProjectFail(response) {
        console.log(response);
    }

    function evaluateProject() {
        $state.go('main.evaluateproject', {
            projectId: $stateParams.projectId
        });
    }

    function getUsersHours() {
        let table = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            let student = vm.studentsTable.body[i];
            let element = {
                AccountId: student.data.User.AccountId,
                Hours: student.content[2].properties.value,
                HoursId: student.data.HoursId
            }
            table.push(element);
        }
        return table;
    }

    function addHours() {
        if (!vm.editHours.value) {
            TbUtils.displayNotification('error', 'Error',
                'Debe de habilitar la edición de las horas.');
            return
        }
        showConfirmDialog();
    }

    function showConfirmDialog() {
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
            SectionId: parseInt($stateParams.sectionId),
            ProjectId: parseInt($stateParams.projectId),
            Users: getUsersHours()
        };
        //hours.postHours(obj, postHoursSuccess, postHoursFail);
        console.log(obj);
    }

    function postHoursFail(response) {
        console.log(response);
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