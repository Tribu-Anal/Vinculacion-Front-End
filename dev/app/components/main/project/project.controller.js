(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['$stateParams', 'projects', 'TbUtils'];

	function ProjectController($stateParams, projects, TbUtils) {
		var vm = this;

		vm.project = {};
		vm.projectLoading = true;
		vm.participantsLoading = true;
		vm.participants = {
			headers: [
				'Alumno'
			],
			body: [],
			actions: false
		};
		vm.editHours = editHours;

		projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);
        
        function getProjectSuccess(response) {
            console.log(response);
            vm.project = response.data;
            vm.projectLoading = false;
        };
        
        function getProjectFail() {
            TbUtils.displayNotification('error', 'Error', 'El proyecto deseado no existe.');
        	vm.projectLoading = false;
        };

		function getParticipants() {
			/*
			 * @todo Request al server por los participantes
			 */
		}

		function editHours(participant) {
			/*
			 * @todo Que funcione con un table o grid en vez de dialog
			 */
		}
	}
})();