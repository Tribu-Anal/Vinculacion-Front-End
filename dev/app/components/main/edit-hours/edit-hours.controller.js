EditHoursController.$inject = ['$stateParams', '$state', 'sections',
    'TbUtils', 'tableContent', '$rootScope', 'hours', '$mdDialog', 'students'
];

function EditHoursController($stateParams, $state, sections,
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
    vm.savebutton = false;
    vm.triggerButton = triggerButton;
    vm.addHours = {
        onClick: addHours,
        icon: 'glyphicon-plus',
        tooltip: 'Agregar horas'
    }
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre', 'Horas en este proyecto']);
    // if ($rootScope.Role === 'Professor') {
    //     vm.studentsTable.headers.push('Horas Trabajadas');
    //     vm.studentsTable.headers.push(' ');
    // }

    sections.getStudentsHoursBySectionId($stateParams.sectionId, getStudentsHoursSuccess, getStudentsHoursFail);
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

    function evaluateProject(){
      $state.go('main.evaluateproject', {
          projectId: $stateParams.projectId
      });
    }

    function triggerButton(){
      if(!vm.savebutton)
        vm.savebutton = true;
      else
        vm.savebutton = false;
    }

    function getInputValue() {
        let table = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
            let student = vm.studentsTable.body[i];
            let element = {
                data: student.data,
                inputValue: student.content[3].properties.value
            }
            table.push(element);
        }
        return table;
    }

    function addHours(studentData) {
        if (!vm.editHours.value) {
            TbUtils.displayNotification('error', 'Error',
                'Debe de habilitar la edición de las horas.');
            return
        }
        showConfirmDialog(studentData.data.AccountId,
            studentData.content[3].properties.value,
            studentData.data.Name);
    }

    function showConfirmDialog(accountId, hrs, studentName) {
    	if(!hrs){
    		TbUtils.displayNotification('error', 'Error',
                'Debe de ingresar una cantidad de horas');
            return
    	}
        const confirm = $mdDialog.confirm()
            .title('¿Está seguro de que quiere registrar las horas?')
            .textContent('Está apunto de asignarle al estudiante ' +
                TbUtils.toTitleCase(studentName) +
                ' con número de cuenta: ' + accountId +
                ' la cantidad de: ' + hrs +
                ' horas trabajadas en este proyecto.')
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(result => {
            if (result)
                saveHoursByStudent(accountId, hrs);
        });
    }

    function saveHoursByStudent(accountId, hrs) {
        let obj = {
            AccountId: accountId,
            SectionId: parseInt($stateParams.sectionId),
            ProjectId: parseInt($stateParams.projectId),
            Hour: hrs
        };
        hours.postHours(obj, postHoursSuccess, postHoursFail);
    }

    function postHoursFail(response){
    	console.log(response);
    	TbUtils.displayNotification('error', 'Error',
                'No se pudieron registrar las horas');
    }

    function postHoursSuccess(){
    	TbUtils.displayNotification('success', 'Exitoso',
                'Horas registradas exitosamente.');
    }
}

module.exports = {
    name: 'EditHoursController',
    ctrl: EditHoursController
};
