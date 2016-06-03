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
            $timeout(changeViewStyles, $rootScope.generalLoading ? 1 : 0);
            $rootScope.stateLoading = false; 
            $rootScope.generalLoading = true; 
        }, $rootScope.generalLoading ? 500 : 500);
    }

    function changeViewStyles () {
        switch(stateUrl) {
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
            case "/editar-proyecto/{project}":
                $rootScope.viewTitle = stateUrl.includes('nuevo') ? 
                                       "Vinculacion | Nuevo Proyecto" :
                                       "Vinculacion | Editar Proyecto";
                $rootScope.viewStyles = "main project-form";
            break;
            case "/nueva-seccion":
                $rootScope.viewTitle = "Vinculacion | Nueva Seccion";
                $rootScope.viewStyles = "main project-form";
            break; 
            case "/secciones":
                $rootScope.viewTitle = "Vinculacion | Secciones";
                $rootScope.viewStyles = "main";
            break;
            case "/seccion":
                $rootScope.viewTitle = "Vinculacion | Seccion";
                $rootScope.viewStyles = "main section";
            break;
            case "/":
                $rootScope.viewTitle = "Vinculacion | Bienvenido";
                $rootScope.viewStyles = "landing";
            break;
        }
    }

}

module.exports = run;