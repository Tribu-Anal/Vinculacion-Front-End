function tbtableElem () {
	const directive = {
		restrict: 'E',
		scope: {
			type: '@?',
			props: '=?'
		},
		templateUrl: 'templates/shared/TB-Table/TB-TableRow/TB-TableElem/tb-table-elem.html'
	};

	return directive;
}

module.exports = { name: 'tbtableElem', drtv: tbtableElem };