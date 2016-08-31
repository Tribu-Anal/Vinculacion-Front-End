ImportStudentsController.$inject = [ 'TbUtils', 'students', '$state' ];

const mockData = [ 
	{ AccountId: 102987, Name: 'Alejandro Ferrera', Email: 'ale.killer@unitec.edu',  Major: 'Sistemas', Exists: false }, 
	{ AccountId: 834748, Name: 'Daniel Perez',      Email: 'dannyel@unitec.edu',     Major: 'Sistemas', Exists: false }, 
	{ AccountId: 390098, Name: 'Daniel Zelaya',     Email: 'danielzy95@unitec.edu',  Major: 'Sistemas', Exists: false }, 
	{ AccountId: 202022, Name: 'Kelvin Chinchilla', Email: 'kelvinnosse@unitec.edu', Major: 'Sistemas', Exists: false }, 
	{ AccountId: 737102, Name: 'Soware Malware',    Email: 'soware@unitec.edu',      Major: 'Sistemas', Exists: false },
	{ AccountId: 382722, Name: 'Fabian Love',       Email: 'fabianlove@unitec.edu',  Major: 'Sistemas', Exists: false },
	{ AccountId: 393932, Name: 'Ooohhh Fabian',     Email: 'fabian@unitec.edu',      Major: 'Sistemas', Exists: false },
	{ AccountId: 737282, Name: 'Ooohhh Que Canon',  Email: 'canon@unitec.edu',       Major: 'Sistemas', Exists: false } 
];

function ImportStudentsController (TbUtils, students, $state) {
	const vm = this;

	vm.upload = upload;
	vm.submit = submit;
	vm.reset  = reset;
	vm.excelStudents = null;
	vm.tableSchema = require('../../../table-schemas/excel-students-table-schema');
	vm.parseLoading  = false;
	vm.submitting    = false;

	function upload (data) {
		const base64Data = btoa(data);
		// console.log(base64Data);
		vm.parseLoading = true;

		students.getParsedStudentsExcel(base64Data).then( 
		resolve => { vm.excelStudents = resolve; vm.parseLoading = false; }, 
		reject => { 
			// vm.excelStudents = mockData; vm.parseLoading = false;
			TbUtils.displayNotification('error', 'Error', reject); vm.parseLoading = false; 
	});
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
	}

}

module.exports = { name: 'ImportStudentsController', ctrl: ImportStudentsController };