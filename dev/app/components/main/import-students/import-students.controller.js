ImportStudentsController.$inject = [ 'TbUtils', 'students', '$state' ];

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
		vm.parseLoading = true;
		
		const base64Data = btoa(data);

		students.getParsedStudentsExcel('"'+base64Data+'"').then( 
		resolve => { vm.excelStudents = resolve; vm.parseLoading = false; }, 
		reject => { TbUtils.displayNotification('error', 'Error', reject); vm.parseLoading = false; });
	}

	function submit () {
		vm.submitting = true;

		const newStudents = TbUtils.queryList(vm.excelStudents, 'Estado', false);

		students.importStudents(newStudents).then(resolve => { 
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