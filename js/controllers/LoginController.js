var app = angular.module('VinculacionApp');
  
app.controller('LoginCtrl', ['$rootScope', '$location', 'AuthenticationService', 'toaster', function ($rootScope, $location, AuthenticationService, toaster) {
    var controlador = this;
    controlador.username;
    controlador.password;
    
    // reset login status
    AuthenticationService.ClearCredentials();

    controlador.login = function () {
        console.log("Login");
        controlador.dataLoading = true;
        AuthenticationService.Login(controlador.username, controlador.password, function(response) {
            if(response.statusText === "OK") {
                console.log(response);
                AuthenticationService.SetCredentials(response.data);
                $location.path('/home');
            }
        }, function(response) {
            console.log(response);
            switch(response.statusText) {
                case "Unauthorized":
                    toaster.pop({type: 'warning', title: 'Falla autorizacion', body: 'La cuenta ingresada no tiene privilegios de acceso'});
                    break;
                
                default:
                    toaster.pop({type: 'error', title: 'Error', body: 'Se ha producido un error! Lamentamos los inconvenientes.'});
            }
        });
    };
}]);