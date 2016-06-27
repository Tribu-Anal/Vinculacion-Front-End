(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbPaginator', tbPaginator);

    function tbPaginator() {
        var directive = 
        {
            restrict: 'E',
            scope: {
                options: '=?',
                onPageChange: "=?"
            },
            controller : 'PaginatorController as vm',
            templateUrl: '../templates/shared/TB-Paginator/paginator.html'           
        };

        return directive;
    }

})();