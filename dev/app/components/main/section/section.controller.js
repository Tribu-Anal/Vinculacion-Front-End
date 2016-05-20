(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionController', SectionController);

    SectionController.$inject = [ '$rootScope', '$stateParams', '$state', 'TbUtils', 'tableContent'];

    function SectionController($rootScope, $stateParams, $state, TbUtils, tableContent) {
        var vm = this;
        
        vm.section = JSON.parse($stateParams.data);
        
        console.log(vm.section);
    }
})();