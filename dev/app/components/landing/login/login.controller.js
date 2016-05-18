(function () {
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
        vm.loading = false;

        authentication.ClearCredentials();

        function login() {
            vm.loading = true;

            authentication.Login( vm.username, vm.password, LoginSuccess, LoginFail);
        }
        
        function LoginSuccess(response) {
            authentication.SetCredentials(response.data);
            $location.path('/home');
            window.localStorage['Session'] = JSON.parse(response.config.data).User;
            
            vm.loading = false;
        }
        
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
            vm.loading = false;
        }
    }
})();