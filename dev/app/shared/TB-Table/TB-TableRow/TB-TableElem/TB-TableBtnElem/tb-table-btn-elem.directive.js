function tbTableButtonElem () {
	const directive = {
		restrict: 'E',
		scope: {
			onClick: '=?',
			icon: '@?',
			tooltip: '@?'
		},
		templateUrl: 
		'templates/shared/TB-Table/TB-TableRow/TB-TableElem/TB-TableBtnElem/tb-table-btn-elem.html'
	};

	return directive;
}

module.exports = { name: 'tbTableButtonElem', drtv: tbTableButtonElem };