TbTableController.$inject = ['$scope', '$state', 'TbUtils'];

function TbTableController($scope, $state, TbUtils) {
    var vm = this;
    vm.onRowClick = onRowClick;
    vm.onBtnClick = onBtnClick;

    let btnClicked = false;

    function onRowClick(row) {
        console.log(row);
        if (!btnClicked && $scope.ref) {
            TbUtils.preventGeneralLoading();
            $state.go($scope.ref, {
                sectionId: row.data.sectionId ? row.data.sectionId : row.data.Id,
                projectId: row.data.Id
            });
        }
            
        btnClicked = false;
    }

    function onBtnClick (row) {
        btnClicked = true;
        vm.loseFocus();
    }

    vm.loseFocus = function() {
        $(':focus').blur();
    };
}

module.exports = {
    name: 'TbTableController',
    ctrl: TbTableController
};