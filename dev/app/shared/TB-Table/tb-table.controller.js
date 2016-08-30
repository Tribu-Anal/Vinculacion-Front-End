TbTableController.$inject = ['$scope', '$state', 'TbUtils', 'tableBuilder'];

function TbTableController($scope, $state, TbUtils, tableBuilder) {
    const vm = this;

    vm.table = tableBuilder.newTable($scope.tableModel);
    $scope.headers = vm.table.headers;
    $scope.rows = vm.table.rows;
    
}

module.exports = {
    name: 'TbTableController',
    ctrl: TbTableController
};