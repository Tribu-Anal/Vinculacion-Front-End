(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionController', SectionController);

    SectionController.$inject = [ '$rootScope', '$stateParams', '$state', 'TbUtils', 'tableContent'];

    function SectionController($rootScope, $stateParams, $state, TbUtils, tableContent) {
        var vm = this;
        
        vm.section = JSON.parse($stateParams.data);
        
        vm.sectionsTable = {
            headers: [
                'Nombre',
                'Numero de Cuenta'
            ],
            
            body: [],
            
            actions: true
        };
        
        console.log(vm.section);
    }
})();