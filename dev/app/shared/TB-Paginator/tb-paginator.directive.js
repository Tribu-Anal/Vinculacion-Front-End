function tbPaginator() {
    var directive = 
    {
        restrict: 'E',
        scope: {
            options: '=?',
            onPageChange: "=?"
        },
        controller : 'PaginatorController as vm',
        templateUrl: 'templates/shared/TB-Paginator/tb-paginator.html'           
    };

    return directive;
}

module.exports = { name: 'tbPaginator', drtv: tbPaginator };