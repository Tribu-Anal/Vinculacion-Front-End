function tbTableLabelElem () {
	const directive = {
		restrict: 'E',
		scope: {
			text: '@?'
		},
		templateUrl: 
		'templates/shared/TB-Table/TB-TableRow/TB-TableElem/TB-TableLabelElem/tb-table-label-elem.html'
	};

	return directive;
}

module.exports = { name: 'tbTableLabelElem', drtv: tbTableLabelElem };