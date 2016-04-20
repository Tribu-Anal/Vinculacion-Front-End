(function() {
    "use strict";

    angular
        .module("VinculacionApp")
        .run(run);

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state', 
                    '$timeout'];

    function run ($rootScope, $location, $cookieStore, $http, $state, $timeout) {

        $rootScope.links = [];
        $rootScope.stateLoading = false;
        $rootScope.hideLoading = true;
        
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.token) {
            $http.defaults.headers.common['Authorization'] = 
            $rootScope.globals.token; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/' && !$rootScope.globals.token) {
                $location.path('/');
            }
        });

        $rootScope.$on('$stateChangeStart', changeViewStyles);

        $rootScope.$on('$viewContentLoading',function(event, viewConfig) {
            $rootScope.stateLoading = true;
            $rootScope.hideLoading = false;
        });

        $rootScope.$on('$viewContentLoaded',function(event) {
            $timeout(function(){ $rootScope.stateLoading = false; }, 100);
            $rootScope.hideLoading = true;
        });

        function changeViewStyles (event, toState) {
            switch(toState.url) {
                case "/home":
                    $rootScope.viewStyles = "navigation home";
                break;
                case "/proyectos":
                    $rootScope.viewStyles = "navigation projects";
                break;
                case "/proyectos/{}":
                    $rootScope.viewStyles = "navigation project";
                break;
                case "/solicitudes":
                    $rootScope.viewStyles = "navigation requests";
                break;
                case "/":
                    $rootScope.viewStyles = "landing";
                break;
            }
        }

    }
})();