(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['$stateParams', 'projects'];

	function ProjectController($stateParams, projects) {
		var vm = this;

		vm.project = {};
	    vm.participants = [];
	    vm.editHours = editHours;

	    projects.getProject( $stateParams.projectId, 
            function(response) {
                console.log(response);
                vm.project = response.data;
            }, 
            function(response) {
                toaster.pop(
                    {
                        type: 'error', 
                        title: 'Error', 
                        body: 'El proyecto deseado no existe.'
                    }
                );
            }
        );

		function getParticipants(){
			/*
	         * @todo Request al server por los participantes
	         */
	    }

	    function editHours (participant) {
	        /*
	         * @todo Que funcione con un table o grid en vez de dialog
	         */
	    }
	}
})();