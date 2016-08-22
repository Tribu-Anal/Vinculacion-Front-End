PaginatorController.$inject = ['$scope', '$state'];

function PaginatorController ($scope, $state) {
    var vm = this;
    
    vm.onPageChange = onPageChange;
    vm.init = init;
    vm.active = 1;

    function init(){
        vm.pages = [];
        for (let i = 1; i < $scope.options.count / $scope.options.pageSize + 1; i++) {
            vm.pages.push(i);
        }
        return vm.pages;
    }
    
    function onPageChange (page) {
        vm.active=page;
        if($scope.onPageChange)
            $scope.onPageChange($scope.options.pageSize, page - 1);
    }
    
    vm.loseFocus = function(){
    	$(':focus').blur();
    };
}

module.exports = { name: 'PaginatorController', ctrl: PaginatorController };