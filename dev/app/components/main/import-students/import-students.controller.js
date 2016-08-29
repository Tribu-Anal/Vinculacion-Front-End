ImportStudentsController.$inject = [ 'TbUtils', 'tableBuilder', 'students', '$state' ];

const mockData = [ 
	{ AccountId: 102987, Name: 'Alejandro Ferrera' }, 
	{ AccountId: 834748, Name: 'Daniel Perez' }, 
	{ AccountId: 390098, Name: 'Daniel Zelaya' }, 
	{ AccountId: 202022, Name: 'Kelvin Chinchilla' }, 
	{ AccountId: 737102, Name: 'Soware Malware' },
	{ AccountId: 382722, Name: 'Fabian Love' },
	{ AccountId: 393932, Name: 'Ooohhh Fabian' },
	{ AccountId: 737282, Name: 'Ooohhh Que Canon' } 
];

function ImportStudentsController (TbUtils, tableBuilder, students, $state) {
	const vm = this;

	vm.upload = upload;
	vm.submit = submit;
	vm.reset  = reset;
	vm.excelStudents = null;
	vm.studentsTable = null;
	vm.parseLoading  = false;
	vm.submitting    = false;

	function upload (data) {
		const base64Data = btoa(data);
		console.log(base64Data);
		// vm.parseLoading = true;

		// students.getParsedStudentsExcel(base64Data).then( 
		// resolve => { vm.excelStudents = resolve;  buildStudentsTable(); vm.parseLoading = false; }, 
		// reject => { TbUtils.displayNotification('error', 'Error', reject); vm.parseLoading = false; });
	}

	function buildStudentsTable () {
		vm.studentsTable = tableBuilder.newTable([ 'Numero de Cuenta', 'Nombre' ], 
			                                     vm.excelStudents, ['AccountId', 'Name']);
	}

	function submit () {
		vm.submitting = true;

		students.importStudents(vm.excelStudents).then(resolve => { 
			TbUtils.displayNotification("success", "Exito", "Los alumnos se importaron exitosamente");
			TbUtils.preventGeneralLoading();
			$state.reload();
			vm.submitting = false;
		}, reject => { 
			TbUtils.displayNotification("error", "Error", reject); 
			vm.submitting = false;
		});
	}

	function reset () {
		vm.excelStudents = null;
		vm.studentsTable = null;
	}

}

module.exports = { name: 'ImportStudentsController', ctrl: ImportStudentsController };