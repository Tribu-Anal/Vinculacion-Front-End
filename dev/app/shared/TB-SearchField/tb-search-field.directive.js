tbSearchField.$inject = [ 'filterFilter' ];

function tbSearchField(filterFilter) {
    var directive = {
        restrict: 'E',
        scope: {
            obj: '=?',
            results: '=?',
            data: '=?',
            getAll: '=?',
            loading: '=?',
            auto: '=?',
            min: '=?',
            placeholder: '@?'
        },
        templateUrl: 'templates/shared/TB-SearchField/tb-search-field.html',
        link: scope => {
            if (!scope.placeholder) scope.placeholder = "Ingrese su busqueda";
            if (scope.auto && !scope.min) scope.min = 1;

            scope.all = null;

            scope.search = term => {
                if (typeof scope.obj === 'function')
                    scope.results = filterFilter(scope.data, scope.obj(term));
                else
                    scope.results = scope.data;
            };

            scope.searchAll = term => {
                if (typeof scope.getAll === 'function' && !scope.all) {
                    scope.loading = true;
                    scope.getAll(resp => { scope.all = resp.data; 
                                           scope.results = filterFilter(scope.all, scope.obj(term)); }, 
                                 resp => { TbUtils.showErrorMessage(resp.data) },
                                 ()   => { scope.loading = false; });
                }
                else
                    scope.results = filterFilter(scope.all, scope.obj(term));
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