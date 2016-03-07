'use strict';
var app = angular.module('VinculacionApp');
app.factory('solicitudesEndPoints', ['$http', function($http){
	var ctrl = this;
	var url = 'http://fiasps.unitec.edu:8085/api';
	return {
		obtenerAlumnosConSolicitudesPendientes:function(handleSuccess){
			var peticion = {
                method: 'GET',
                url: url +'/Students/Filter/Active'
            };
            $http(peticion).then(function(data) {
                handleSuccess(data);
            });
		}, 
		Rechazar_SolicitudDeAlumno:function(objetoARegistrar, mensaje, handleSuccess){
			var peticion = {
				method: 'POST',
				url: url+ '/Students/Rejected',
				data: JSON.stringify({AccountId: objetoARegistrar.AccountId, Message: mensaje})
			};
			$http(peticion).then(function(data) {
                handleSuccess(data);
            });
		},
        Aceptar_SolicitudDeAlumno:function(objetoARegistrar, handleSuccess){
			var peticion = {
				method: 'PUT',
				url: url+ '/Students/Verified',
				data: JSON.stringify({AccountId: objetoARegistrar.AccountId})
			};
			$http(peticion).then(function(data) {
                handleSuccess(data);
            });
		}
	};
}]);
