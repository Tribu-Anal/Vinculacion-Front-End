(function () {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', 'authentication', 'toaster', 'TbUtils'];

    function LoginController ($rootScope, $location, authentication, toaster, TbUtils) {
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
            if(response.statusText === "OK") {
                console.log(response);
                authentication.SetCredentials(response.data);
                $location.path('/home');
            }
            
            vm.loading = false;
        }
        
        function LoginFail(response) {
            console.log(response);
            TbUtils.showErrorMessage('error', response, 
                                     'La cuenta ingresada no tiene privilegios de acceso',
                                     'Falla autorizacion');
            
            vm.loading = false;
        }
    }
})();