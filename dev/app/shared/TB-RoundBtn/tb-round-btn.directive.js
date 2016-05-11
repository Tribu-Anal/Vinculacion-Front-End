(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbRoundBtn', tbRoundBtn);

    function tbRoundBtn() {
        var directive = 
        {
            restrict: 'E',
            transclude: true,
            template: '<ng-transclude></ng-transclude>'        
        };

        return directive;
    }

})();