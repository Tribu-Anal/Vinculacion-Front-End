var app = angular.module('VinculacionApp');
  
app.controller('LoginCtrl', ['$rootScope', '$location', 'AuthenticationService', function ($rootScope, $location, AuthenticationService) {
    var controlador = this;
    controlador.username;
    controlador.password;
    
    // reset login status
    AuthenticationService.ClearCredentials();

    controlador.login = function () {
        controlador.dataLoading = true;
        AuthenticationService.Login(controlador.username, controlador.password, function(response) {
            if(response !== null) {
                AuthenticationService.SetCredentials(controlador.username, controlador.password);
                $location.path('/home/proyecto');
                console.log(response);
                console.log("Entro");
            } else {
                //controlador.error = response.message;
                controlador.dataLoading = false;
                //console.log(controlador.error);
            }
        });
    };
    
    controlador.message = "Hello";
}]);