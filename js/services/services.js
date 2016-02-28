'use strict';
var app = angular.module('VinculacionApp');
app.factory('horasEndPoints', ['$http', function($http){
	var ctrl = this;
	var url = 'http://vinculacionbackend.apphb.com/api';
	return {
		obtenerAlumnosPorSeccion:function(seccion, handleSuccess){
			var peticion = {
                method: 'GET',
                url: url +'/Students'
            };
            $http(peticion).then(function(data) {
                handleSuccess(data);
            });
		},
		agregarHorasAlAlumno:function(objetoARegistrar, handleSuccess){
			var peticion = {
				method: 'POST',
				url: url+ '/Hours',
				data: objetoARegistrar
			};
			$http(peticion).then(handleSuccess);
		}
	};
}]);