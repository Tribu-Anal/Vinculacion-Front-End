var app = angular.module('VinculacionApp');
  
app.controller('LoginCtrl', ['$rootScope', '$location', 'AuthenticationService', 'toaster', function ($rootScope, $location, AuthenticationService, toaster) {
    var controlador = this;
    controlador.username;
    controlador.password;
    
    // reset login status
    AuthenticationService.ClearCredentials();

    controlador.login = function () {
        controlador.dataLoading = true;
        AuthenticationService.Login(controlador.username, controlador.password, function(response) {
            if(response !== "") {
                AuthenticationService.SetCredentials(response);
                $location.path('/home');
            } 
            else {
                toaster.pop({type: 'warning', title: 'Usuario no encontrado.', body: 'No se encontro algun usuario conesas credenciales!'});
            }
        }, function() {
            toaster.pop({type: 'error', title: 'Error', body: 'Se ha producido un error! Lamentamos los inconvenientes.'});
        });
    };
}]);