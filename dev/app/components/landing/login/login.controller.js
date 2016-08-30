LoginController.$inject = ['$rootScope', '$location', 'auth',
                                'role', 'toaster', 'TbUtils', '$state'];

function LoginController ($rootScope, $location, auth, role, toaster, TbUtils, $state) {
    var vm = this;

    vm.username = "";
    vm.password = "";
    vm.login = login;
    vm.loading = false;

    let DBId = -1;

    auth.ClearCredentials();

    function login() {
        vm.loading = true;

        auth.Login( vm.username, vm.password, LoginSuccess, LoginFail);
    }

    function LoginSuccess(response) {
        DBId = response.data.Id;
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

        if(response.data === 'Professor') {
            window.localStorage['ProfessorDBId'] =
            $rootScope.ProfessorDBId = DBId;
        }

        if ($rootScope.Role === 'Admin')
            $state.go('main.projects');
        else
            $state.go('main.'+$rootScope.Role.toLowerCase()+'-dashboard');

        vm.loading = false;
    }

    function LoginFail(response) {
        TbUtils.showErrorMessage('error', response,
                                 'La cuenta ingresada no tiene privilegios de acceso',
                                 'Falla autorizacion');

        vm.loading = false;
    }
}

module.exports = { name: 'LoginController', ctrl: LoginController };
