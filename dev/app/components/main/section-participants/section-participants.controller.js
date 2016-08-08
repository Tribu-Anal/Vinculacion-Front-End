SectionParticipantsController.$inject = ['$stateParams', 'sections',
    'TbUtils', 'tableContent', '$rootScope'
];

function SectionParticipantsController($stateParams, sections,
    TbUtils, tableContent, $rootScope) {
    const vm = this;
    vm.participantsLoading = true;
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
    }

    function getStudentsFail() {
        vm.participantsLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente.');
    }

    function getInputValue() {
        let table = [];
        for (let i = 0; i < vm.studentsTable.body.length; i++) {
        	let student = vm.studentsTable.body[i];
        	let element = {
        		data: student.data,
        		inputValue: student.content[4].properties.value
        	}
        	table.push(element);
        }
        return table;
    }
}

module.exports = {
    name: 'SectionParticipantsController',
    ctrl: SectionParticipantsController
};