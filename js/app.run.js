(function() {
    "use strict";

    angular.module("VinculacionApp")
        .run(run);

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        // $rootScope.globals = $cookieStore.get('globals') || {};
        // if ($rootScope.globals.token) {
        //     $http.defaults.headers.common['Authorization'] = 
        //     $rootScope.globals.token; // jshint ignore:line
        // }

        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     // redirect to login page if not logged in
        //     if ($location.path() !== '/' && !$rootScope.globals.token) {
        //         $location.path('/');
        //     }
        // });
        
        $rootScope.links = [];
    }
})();