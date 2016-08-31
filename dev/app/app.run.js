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
    $rootScope.loggedIn = $rootScope.Session.length > 0;

    let stateUrl = "";
    let redirect = require('./redirect');

    getBasicAuthentication();

    $rootScope.$on('$stateChangeStart', stateChangeStart);

    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function getBasicAuthentication() {
        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.token) {
            $http.defaults.headers.common['Authorization'] =
                $rootScope.globals.token;
        }
    }

    function stateChangeStart (event, toState) {
        $rootScope.stateLoading = true;
        stateUrl = toState.url;
        redirect($state, toState.name, 
            $rootScope.Role.toLowerCase(), $rootScope.Session.length > 0, event);
    }

    function stateChangeSuccess (event) {
        $timeout(function(){
            $rootScope.stateLoading = false;
            $rootScope.generalLoading = true;
        }, $rootScope.generalLoading ? 500 : 500);
    }
}

module.exports = run;
