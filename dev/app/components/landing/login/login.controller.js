LoginController.$inject = ['$rootScope', '$location', 'auth', 
                                'role', 'toaster', 'TbUtils'];

function LoginController ($rootScope, $location, auth, role, toaster, TbUtils) {
    var vm = this;

    vm.username = "";
    vm.password = "";
    vm.login = login;
    vm.loading = false;

    auth.ClearCredentials();

    function login() {
        vm.loading = true;

        auth.Login( vm.username, vm.password, LoginSuccess, LoginFail);
    }
    
    function LoginSuccess(response) {
        console.log(response);
        auth.SetCredentials(response.data);
        
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

module.exports = { name: 'LoginController', ctrl: LoginController };