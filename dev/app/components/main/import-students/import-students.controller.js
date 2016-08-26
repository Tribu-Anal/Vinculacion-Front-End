ImportStudentsController.$inject = [ '$scope', 'TbUtils' ];

function ImportStudentsController ($scope, TbUtils) {
	const vm = this;

	vm.filedData = null;
	vm.upload = upload;

	function upload (data) {
		console.log(data);
		// To base64
		// API call
	}

}

module.exports = { name: 'ImportStudentsController', ctrl: ImportStudentsController };