tbTable.$inject = [ 'tableBuilder' ];

function tbTable(tableBuilder) {
    var directive = 
    {
        restrict: 'E',
        scope: {
            schema: '=',
            model: '=',
            onRowClick: '=?'
        },
        link: scope => {
            scope.$watch('model', newModel => {
                if (newModel) 
                    scope.table = tableBuilder.newTable(scope.schema, newModel);
                else
                    scope.table = tableBuilder.emptyTable();
            });
        },
        templateUrl: 'templates/shared/TB-Table/tb-table.html'           
    };

    return directive;
}

module.exports = { name: 'tbTable', drtv: tbTable };