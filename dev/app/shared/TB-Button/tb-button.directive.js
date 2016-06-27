(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbButton', tbButton);

    function tbButton() {
        var directive = {
            restrict: 'E',
            scope: {
                text: '=?',
                onClick: '=?',
                round: '=?'
            },
            controller: 'ButtonController as vm',
            templateUrl: '../templates/shared/TB-Button/tb-button.html'
        };

        return directive;
    }

})();