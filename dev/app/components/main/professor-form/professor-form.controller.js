(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProfessorFormController', ProfessorFormController);

    ProfessorFormController.$inject = ['$rootScope', '$state', 'TbUtils', 'sections', 'sectionData',
        'tableContent'
    ];

    function ProfessorFormController($rootScope, $state, TbUtils, sections, sectionData, tableContent) {
        if ($rootScope.Role !== 'Admin') $state.go('dashboard.home');

        var vm = this;

        
    }
})();