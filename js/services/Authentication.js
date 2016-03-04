var app = angular.module('VinculacionApp');

app.factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', function ($http, $cookieStore, $rootScope) {
        var service = {};
 
        service.Login = function (username, password, callback) {
            $http.post('http://fiasps.unitec.edu:8085/api/Login', JSON.stringify({ User: username, Password: password }))
                .success(function (response) {
                    //console.log(response);
                    callback(response);
                });
 
        };
  
        service.SetCredentials = function (token) {  
            $rootScope.globals.token = token
  
            $http.defaults.headers.common['Authorization'] = token // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
            //console.log('Cookie set!');
        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
            console.log('Cookie removed!');
        };
  
        return service;
    }]);