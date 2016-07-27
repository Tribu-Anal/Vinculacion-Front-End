
function tbSearchField() {
	var directive = {
		restrict: 'E',
		templateUrl: 'templates/shared/TB-SearchField/tb-search-field.html'
	}

	return directive;
}

module.exports = { name: 'tbSearchField', drtv: tbSearchField };