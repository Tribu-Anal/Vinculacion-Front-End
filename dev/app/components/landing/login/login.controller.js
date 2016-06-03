"use strict";

LoginController.$inject = ['$rootScope', '$location', 'authentication', 
                           'role', 'toaster', 'TbUtils'];

function LoginController ($rootScope, $location, authentication, role, toaster, TbUtils) {
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
        
        window.localStorage['Session'] = 
        $rootScope.Session =
        JSON.parse(response.config.data).User;

        window.localStorage['Email'] =
        $rootScope.Email = 
        vm.username;
        role.get($rootScope.Session, getRoleSuccess);
    }

    function getRoleSuccess (response) {
        window.localStorage['Role'] = 
        $rootScope.Role =
        response.data;

        $location.path('/home');
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

module.exports = LoginController;