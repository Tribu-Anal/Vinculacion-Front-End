function tbTableHeader () {
	const directive = {
		restrict: 'E',
		scope: {
			text: '=?'
		},
		templateUrl: 'templates/shared/TB-Table/TB-TableHeader/tb-table-header.html'
	};

	return directive;
}

module.exports = { name: 'tbTableHeader', drtv: tbTableHeader };