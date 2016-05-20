(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionController', SectionController);

    SectionController.$inject = [ '$rootScope', '$stateParams', '$state', 'TbUtils', 'tableContent'];

    function SectionController($rootScope, $stateParams, $state, TbUtils, tableContent) {
        if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('dashboard.home');
        
        var vm = this;
        
        vm.section = JSON.parse($stateParams.data);
        vm.sectionsTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre']);
        
        console.log(vm.section);
    }
})();