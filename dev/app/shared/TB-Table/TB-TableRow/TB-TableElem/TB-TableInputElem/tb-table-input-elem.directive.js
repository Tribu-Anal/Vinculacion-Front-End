function tbTableInputElem () {
	const directive = {
		restrict: 'E',
		scope: {
			props: '=?'
		},
		templateUrl: 
		'templates/shared/TB-Table/TB-TableRow/TB-TableElem/TB-TableInputElem/tb-table-input-elem.html'
	};

	return directive;
}

module.exports = { name: 'tbTableInputElem', drtv: tbTableInputElem };