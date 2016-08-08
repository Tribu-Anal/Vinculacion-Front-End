SectionParticipantsController.$inject = ['$stateParams', 'sections',
    'TbUtils', 'tableContent', '$rootScope'
];

function SectionParticipantsController($stateParams, sections,
    TbUtils, tableContent, $rootScope) {
    const vm = this;
    vm.participantsLoading = true;
    $rootScope.Role = 'Professor';
    vm.editHours = {
        visible: $rootScope.Role === 'Professor',
        value: false,
        text: 'Habilitar la edición de las horas'
    }
    vm.studentsTable = TbUtils.getTable(['Número de Cuenta', 'Nombre', 'Horas en este proyecto']);
    if ($rootScope.Role === 'Professor')
        vm.studentsTable.headers.push('Horas Trabajadas');
        

    sections.getStudents($stateParams.sectionId, getStudentsSuccess, getStudentsFail);

    function getStudentsSuccess(response) {
        if (response.data.length <= 0)
            return;
        for (let i = 0; i < response.data.length; i++) {
            let student = response.data[i];
            let newTableElement = {
                content: [
                    tableContent.createALableElement(student.AccountId),
                    tableContent.createALableElement(student.Name),
                    tableContent.createALableElement('0')
                    /*
                    	TODO: cambiar ese 0 por el valor correspondiente
                    	no hay llamada en el api que me de las horas en un proyecto
                    	específicio. 
                    */
                ],
                data: student
            };
            if ($rootScope.Role === 'Professor') {
                let inputProperties = {
                    type: 'number',
                    min: 0,
                    max: 100
                }
                newTableElement.content.push(
                    tableContent.createAnInputElement(inputProperties)
                );
            }
            vm.studentsTable.body.push(newTableElement);
        }
        vm.participantsLoading = false;
        console.log(vm.studentsTable);
    }

    function getStudentsFail() {
        vm.participantsLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente.');
    }
}

module.exports = {
    name: 'SectionParticipantsController',
    ctrl: SectionParticipantsController
};