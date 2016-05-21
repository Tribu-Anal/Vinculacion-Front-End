(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope', '$state'];

    function TableController ($scope, $state) {
        var vm = this;
        
        vm.onRowClick = onRowClick;
        
        function onRowClick (rowData) {
            if ($scope.ref)    
                $state.go($scope.ref, { data: JSON.stringify(rowData) });
            
            $scope.onRowClick();
        }
        
        vm.loseFocus = function(){
        	$(':focus').blur();
        };
    }
})();