run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state',
    '$timeout'
];

function run($rootScope, $location, $cookieStore, $http, $state, $timeout) {
    $rootScope.links = [];
    $rootScope.stateLoading = false;
    $rootScope.hideLoading = true;
    $rootScope.generalLoading = true;
    $rootScope.Session = window.localStorage['Session'];
    $rootScope.Username = window.localStorage['Username'];
    $rootScope.Role = window.localStorage['Role'];
    $rootScope.StudentId = window.localStorage['StudentId'];
    $rootScope.ProfessorDBId = window.localStorage['ProfessorDBId'];
    $rootScope.guest = true;

    let stateUrl = "";
    let redirect = require('./redirect');

    getBasicAuthentication();

    $rootScope.$on('$locationChangeStart', locationChangeStart);

    $rootScope.$on('$stateChangeStart', stateChangeStart);

    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function getBasicAuthentication() {
        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.token) {
            $http.defaults.headers.common['Authorization'] =
                $rootScope.globals.token;
        }
    }

    function locationChangeStart(event, next, current) {
        const loggedIn = $rootScope.globals.token;
        
        if ($location.path() === '/' || 
            $location.path().includes('habilitar-estudiante') || 
            $location.path().includes('/registro-maestro') && 
            loggedIn)
            $location.path('/inicio-'+$rootScope.Role.toLowerCase());
    }

    function stateChangeStart (event, toState) {
        $rootScope.stateLoading = true;
        stateUrl = toState.url;
        redirect($state, toState.name, $rootScope.Role.toLowerCase(), event);
    }

    function stateChangeSuccess (event) {
        $timeout(function(){
            $rootScope.stateLoading = false;
            $rootScope.generalLoading = true;
        }, $rootScope.generalLoading ? 500 : 500);
    }
}

module.exports = run;
