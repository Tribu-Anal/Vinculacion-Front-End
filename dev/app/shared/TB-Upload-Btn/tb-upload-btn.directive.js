function tbUploadBtn () {
	const directive = {
		restrict: 'E',
		controller: 'TbUploadBtnController as vm',
		scope: {
			label: '@',
			upload: '=',
			placeholder: '@'
		},
		templateUrl: 'templates/shared/TB-Upload-Btn/tb-upload-btn.html'
	};

	return directive;
}

module.exports = { name: 'tbUploadBtn', drtv: tbUploadBtn };