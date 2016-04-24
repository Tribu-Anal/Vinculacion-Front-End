(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbTable', tbTable);

    function tbTable() {
        var directive = 
        {
            restrict: 'E',
            scope: {
                headers: '=?',
                body: '=?',
                actions:"=?"
            },
            controller : 'TableController as vm',
            templateUrl: '../templates/shared/TB-Table/table.html'           
        };

        return directive;
    }

})();