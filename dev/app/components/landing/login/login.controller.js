(function(){
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', 'authentication', 'toaster'];

    function LoginController ($rootScope, $location, authentication, toaster) {
        var vm = this;

        vm.username = "";
        vm.password = "";
        vm.login = login;

        authentication.ClearCredentials();

        function login() {
            console.log("Login");

            authentication.Login( vm.username, vm.password, LoginSuccess, LoginFail);
        }
        
        function LoginSuccess(response) {
            if(response.statusText === "OK") {
                console.log(response);
                authentication.SetCredentials(response.data);
                $location.path('/home');
            }
        };
        
        function LoginFail(response) {
            console.log(response);
        /**
         *  @todo Cambiar este switch por un toaster que mande el error del server.
         */
            switch(response.statusText) {
                case "Unauthorized":
                    toaster.pop(
                        { 
                                type: 'warning', 
                                title: 'Falla autorizacion', 
                                body: 'La cuenta ingresada no tiene privilegios de acceso'
                        }
                    );
                    break;

                default:
                    toaster.pop(
                        { 
                            type: 'error', 
                            title: 'Error', 
                            body: 'Se ha producido un error! Lamentamos los inconvenientes.'
                        }
                );
            }
        };
    }
})();