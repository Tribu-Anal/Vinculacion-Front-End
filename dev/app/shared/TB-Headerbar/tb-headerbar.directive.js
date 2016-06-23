(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbHeaderbar', tbHeaderbar);

    function tbHeaderbar() {
        var directive = 
        {
            restrict: 'E',
            scope: {
                expand: '=?',
                username: '@?'
            },
            templateUrl: 'templates/shared/TB-Headerbar/tb-headerbar.html'        
        };

        return directive;
    }

})();