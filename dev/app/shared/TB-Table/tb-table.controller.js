TbTableController.$inject = ['$scope', '$state', 'TbUtils', 'tableBuilder'];

function TbTableController($scope, $state, TbUtils, tableBuilder) {
    const vm = this;

    vm.table = tableBuilder.newTable($scope.tableModel);
    $scope.headers = vm.table.headers;
    $scope.rows = vm.table.rows;
    
    // vm.onRowClick = onRowClick;
    // vm.onBtnClick = onBtnClick;

    // let btnClicked = false;

    // function onRowClick(row) {
    //     if (!btnClicked && $scope.ref) {
    //         TbUtils.preventGeneralLoading();
    //         $state.go($scope.ref, {
    //             sectionId: row.data.sectionId ? row.data.sectionId : row.data.Id,
    //             projectId: row.data.projectId ? row.data.projectId : row.data.Id
    //         });
    //     }

    //     btnClicked = false;
    // }

    // function onBtnClick(row) {
    //     btnClicked = true;
    //     vm.loseFocus();
    // }

    // vm.loseFocus = function() {
    //     $(':focus').blur();
    // };
}

module.exports = {
    name: 'TbTableController',
    ctrl: TbTableController
};