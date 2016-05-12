(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbLoading', tbLoading);
        tbLoading.$inject = ['$rootScope', '$timeout', '$compile', '$templateRequest'];

    function tbLoading($rootScope, $timeout, $compile, $templateRequest) {
        var directive = 
        {
            restrict: 'E',
            templateUrl: 'templates/shared/TB-Loading/tb-loading.html' 
        };

        return directive;
    }
})();