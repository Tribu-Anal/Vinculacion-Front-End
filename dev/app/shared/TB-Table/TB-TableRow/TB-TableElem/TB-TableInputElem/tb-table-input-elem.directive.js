function tbTableInputElem () {
	const directive = {
		restrict: 'E',
		scope: {
			type: '@',
			inputDisabled: '=?',
			model: '=?',
			max: '@?',
			min: '@?',
			disable: '@?'
		},
		templateUrl: 
		'templates/shared/TB-Table/TB-TableRow/TB-TableElem/TB-TableInputElem/tb-table-input-elem.html'
	};

	return directive;
}

module.exports = { name: 'tbTableInputElem', drtv: tbTableInputElem };