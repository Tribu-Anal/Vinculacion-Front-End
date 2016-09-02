tbSearchField.$inject = [ 'filterFilter' ];

function tbSearchField(filterFilter) {
    var directive = {
        restrict: 'E',
        scope: {
            obj: '=',
            results: '=',
            data: '=',
            auto: '=?',
            min: '=?',
            placeholder: '@?'
        },
        templateUrl: 'templates/shared/TB-SearchField/tb-search-field.html',
        link: scope => {
            if (!scope.placeholder) scope.placeholder = "Ingrese su busqueda";
            if (scope.auto && !scope.min) scope.min = 1;

            scope.search = term => {
                if (typeof scope.obj === 'function')
                    scope.results = filterFilter(scope.data, scope.obj(term));
                else
                    scope.results = scope.data;
            };

            scope.$watch('searchText', term => {
                if (scope.auto && term.length >= scope.min)
                    scope.search(term);
                else
                    scope.results = scope.data;
            });

        }
    }

    return directive;
}

module.exports = {
    name: 'tbSearchField',
    drtv: tbSearchField
};