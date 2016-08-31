function tbTable() {
    var directive = 
    {
        restrict: 'E',
        scope: {
            table: '=?',
            tableModel: '=?',
            onRowClick: '=?'
        },
        controller : 'TbTableController as vm',
        templateUrl: 'templates/shared/TB-Table/tb-table.html'           
    };

    return directive;
}

module.exports = { name: 'tbTable', drtv: tbTable };