function tbSearchField() {
    var directive = {
        restrict: 'E',
        templateUrl: 'templates/shared/TB-SearchField/tb-search-field.html',
        link: function(scope, element, attrs) {
            scope.placeholder = scope.placeholder ? scope.placeholder : 'Buscar';
        }
    }

    return directive;
}

module.exports = {
    name: 'tbSearchField',
    drtv: tbSearchField
};