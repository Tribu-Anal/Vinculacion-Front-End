TbTableController.$inject = ['$scope', '$state'];

function TbTableController($scope, $state) {
    var vm = this;
    vm.onRowClick = onRowClick;

    function onRowClick(row) {
        if ($scope.ref)
            $state.go($scope.ref, {
                sectionId: row.data.Id,
                projectId: row.data.projectId
            });
        if (typeof $scope.onRowClick === 'function') {
            $scope.onRowClick(row);
        }
    }

    vm.loseFocus = function() {
        $(':focus').blur();
    };
}

module.exports = {
    name: 'TbTableController',
    ctrl: TbTableController
};