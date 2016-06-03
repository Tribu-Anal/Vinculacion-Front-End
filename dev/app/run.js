"use strict";

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state', 
                '$timeout'];

function run ($rootScope, $location, $cookieStore, $http, $state, $timeout) {

    $rootScope.links = [];
    $rootScope.stateLoading = false;
    $rootScope.hideLoading = true;
    $rootScope.generalLoading = true;
    $rootScope.Session = window.localStorage['Session'];
    $rootScope.Role = window.localStorage['Role'];

    let stateUrl = "";
    
    getBasicAuthentication();

    $rootScope.$on('$locationChangeStart', locationChangeStart);

    $rootScope.$on('$stateChangeStart', stateChangeStart);

    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function getBasicAuthentication () {
        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.token) {
            $http.defaults.headers.common['Authorization'] = 
            $rootScope.globals.token;
        }
    }

    function locationChangeStart (event, next, current) {
        if ($location.path() !== '/' && !$rootScope.globals.token) {
            $location.path('/');
        }
        
        if($location.path() === '/' && $rootScope.globals.token) {
            $location.path('/home');
        }
    }

    function stateChangeStart (event, toState) {
        $rootScope.stateLoading = true;
        stateUrl = toState.url;
    }

    function stateChangeSuccess (event) {
        $timeout(function(){ 
            $rootScope.stateLoading = false; 
            $rootScope.generalLoading = true; 
        }, $rootScope.generalLoading ? 500 : 500);
    }
}

module.exports = run;