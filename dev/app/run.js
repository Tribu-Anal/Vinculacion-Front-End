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
            
            if($location.path() === '/' && $rootScope.globals.token) {
                $location.path('/home');
            }
        });

        $rootScope.$on('$stateChangeStart', changeViewStyles);

        $rootScope.$on('$viewContentLoading',function(event, viewConfig) {
            $rootScope.stateLoading = true;
        });

        $rootScope.$on('$viewContentLoaded',function(event) {
            $timeout(function(){ $rootScope.stateLoading = false; $rootScope.generalLoading = true; }, 100);
        });

        function changeViewStyles (event, toState) {
            $timeout(function(){
                switch(toState.url) {
                case "/home":
                    $rootScope.viewTitle = "Vinculacion | Home";
                    $rootScope.viewStyles = "main home";
                break;
                case "/proyectos":
                    $rootScope.viewTitle = "Vinculacion | Proyectos";
                    $rootScope.viewStyles = "main projects";
                break;
                case "/proyectos/{projectId}":
                    $rootScope.viewTitle = "Vinculacion | Proyecto";
                    $rootScope.viewStyles = "main project";
                break;
                case "/solicitudes":
                    $rootScope.viewTitle = "Vinculacion | Solicitudes";
                    $rootScope.viewStyles = "main requests";
                break;
                case "/nuevo-proyecto":
                    $rootScope.viewTitle = "Vinculacion | Nuevo Proyecto";
                    $rootScope.viewStyles = "main addproject";
                break;  
                case "/":
                    $rootScope.viewTitle = "Vinculacion | Bienvenido";
                    $rootScope.viewStyles = "landing";
                break;
            }
        }, 100);
        }

    }
})();