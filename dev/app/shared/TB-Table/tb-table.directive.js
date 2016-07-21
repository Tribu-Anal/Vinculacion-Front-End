function tbTable() {
    var directive = 
    {
        restrict: 'E',
        scope: {
            headers: '=?',
            body: '=?',
            actions:"=?",
            onRowClick: '=?',
            ref: '@?'
        },
        controller : 'TbTableController as vm',
        templateUrl: 'templates/shared/TB-Table/tb-table.html'           
    };

    return directive;
}

module.exports = { name: 'tbTable', drtv: tbTable };