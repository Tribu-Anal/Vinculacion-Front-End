ConfirmProjectDeleteController.$inject = [ '$scope', 'close' ];

function ConfirmProjectDeleteController ($scope, _close) {
    
    $scope.close = close;

    function close (result) {
      _close(result, 500);
    }

}

module.exports = { name: 'ConfirmProjectDeleteController', ctrl: ConfirmProjectDeleteController };