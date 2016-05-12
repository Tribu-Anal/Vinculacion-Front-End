(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ConfirmDeleteController', ConfirmDeleteController);

    ConfirmDeleteController.$inject = [ '$scope', 'close' ];

    function ConfirmDeleteController ($scope, _close) {
        
        $scope.close = close;

        function close (result) {
          _close(result, 500);
        }

    }

})();