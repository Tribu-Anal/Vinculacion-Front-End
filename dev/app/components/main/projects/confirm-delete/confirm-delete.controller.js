"use strict";

ConfirmDeleteController.$inject = [ '$scope', 'close' ];

function ConfirmDeleteController ($scope, _close) {
    
    $scope.close = close;

    function close (result) {
      _close(result, 500);
    }

}

module.exports = ConfirmDeleteController;