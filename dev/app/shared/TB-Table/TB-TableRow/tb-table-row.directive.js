function tbTableRow () {
	const directive = {
		restrict: 'E',
		scope: {
			elements: '=?',
			data: '=?',
			link: '@?'
		},
		templateUrl: 'templates/shared/TB-Table/TB-TableRow/tb-table-row.html'
	};

	return directive;
}

module.exports = { name: 'tbTableRow', drtv: tbTableRow };