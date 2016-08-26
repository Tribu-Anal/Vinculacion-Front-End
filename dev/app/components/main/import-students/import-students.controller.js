ImportStudentsController.$inject = [ '$scope', 'TbUtils' ];

function ImportStudentsController ($scope, TbUtils) {
	const vm = this;

	vm.filedData = null;
	vm.upload = upload;

	function upload (data) {
		// To base64
		const encodedData = btoa(data);
		console.log(encodedData);
		// API call
	}

}

module.exports = { name: 'ImportStudentsController', ctrl: ImportStudentsController };