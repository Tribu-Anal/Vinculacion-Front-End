AddStudentController.$inject = [ '$scope', 'close' ];

function AddStudentController ($scope, _close) {
    
    $scope.close = close;
    $scope.numCuenta = 0;

    function close () {
      _close({numCuenta: $scope.numCuenta}, 500);
    }

}

module.exports = { name: 'AddStudentController', ctrl: AddStudentController };