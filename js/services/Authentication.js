var app = angular.module('VinculacionApp');

app.factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', 'toaster', function ($http, $cookieStore, $rootScope, toaster) {
        var service = {};
 
        service.Login = function (username, password, successCallback, errorCallback) {
            $http.post('http://fiasps.unitec.edu:8085/api/Login', JSON.stringify({ User: username, Password: password }))
                .then(successCallback, errorCallback);
//                .success(function (response) {
//                    callback(response);
//                })
//                .error(function() {
//                    toaster.pop({type: 'error', title: 'Error', body: 'Se ha producido un error! Lamentamos los inconvenientes.'});
//            });
 
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