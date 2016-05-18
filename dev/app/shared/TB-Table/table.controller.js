(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope'];

    function TableController ($scope) {
        var vm = this;
        vm.loseFocus = function(){
        	$(':focus').blur();
        };
    }
})();