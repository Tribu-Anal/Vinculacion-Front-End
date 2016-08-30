function tbTableIconElem () {
	const directive = {
		restrict: 'E',
		scope: {
			iconClass: '@?',
			fontSize: '@?'
		},
		templateUrl: 
		'templates/shared/TB-Table/TB-TableRow/TB-TableElem/TB-TableIconElem/tb-table-icon-elem.html'
	};

	return directive;
}

module.exports = { name: 'tbTableIconElem', drtv: tbTableIconElem };