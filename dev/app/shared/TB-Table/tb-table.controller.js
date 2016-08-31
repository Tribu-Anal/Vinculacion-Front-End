TbTableController.$inject = ['$scope', '$state', 'TbUtils', 'tableBuilder'];

function TbTableController($scope, $state, TbUtils, tableBuilder) {
    const vm = this;

    vm.table = tableBuilder.newTable($scope.tableModel);

    $scope.table = {
    	update: data => { $scope.tableModel.data = data; vm.table = tableBuilder.newTable($scope.tableModel); }
    };
    
}

module.exports = {
    name: 'TbTableController',
    ctrl: TbTableController
};