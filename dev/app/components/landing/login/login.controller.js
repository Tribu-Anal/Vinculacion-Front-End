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
        console.log(response);
        authentication.SetCredentials(response.data);
        
        window.localStorage['Session'] = 
        $rootScope.Session =
        vm.username;

        window.localStorage['Username'] =
        $rootScope.Username =
        $rootScope.Session.slice(0, $rootScope.Session.indexOf('@'));

        role.get($rootScope.Session, getRoleSuccess);
    }

    function getRoleSuccess (response) {
        window.localStorage['Role'] = 
        $rootScope.Role =
        response.data;

        $location.path('/proyectos');
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
