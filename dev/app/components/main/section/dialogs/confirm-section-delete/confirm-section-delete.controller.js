ConfirmSectionDeleteController.$inject = [ '$scope', 'close' ];

function ConfirmSectionDeleteController ($scope, _close) {
    
    $scope.close = close;

    function close (result) {
      _close(result, 500);
    }

}

module.exports = { name: 'ConfirmSectionDeleteController', ctrl: ConfirmSectionDeleteController };