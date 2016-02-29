'use strict';
var app = angular.module('VinculacionApp');
app.factory('solicitudesEndPoints', ['$http', function($http){
	var ctrl = this;
	var url = 'http://vinculacionbackend.apphb.com/api';
	return {
		obtenerAlumnosConSolicitudesPendientes:function(handleSuccess){
			var peticion = {
                method: 'GET',
                url: url +'/Students/Filter/2'
            };
            $http(peticion).then(function(data) {
                handleSuccess(data);
            });
		}, 
		rechazarSolicitudDeAlumno:function(objetoARegistrar, handeleSuccess){
			var peticion = {
				method: 'POST',
				url: url+ '/Students/'+objetoARegistrar.NumberId+'/Rejected',
				data: objetoARegistrar
			};
			$http(peticion).then(handleSuccess);
		}
	};
}]);