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
        projects.getParticipants($stateParams.projectId, getParticipantsSuccess, getParticipantsFail);

        function getProjectSuccess(response) {
            vm.project = response.data;
            vm.projectLoading = false;
        }

        function getProjectFail() {
            TbUtils.displayNotification('error', 'Error',
                'El proyecto deseado no existe.');
            vm.projectLoading = false;
        }

        function getParticipantsSuccess(response) {
        	console.log(response.data);
        	addParticipantsToTable(response.data);
        	vm.participantsLoading = false;
        }

        function getParticipantsFail() {
        	TbUtils.displayNotification('error', 'Error',
                'Hubo error al momento de cargar a los alumnos.');
        	vm.participantsLoading = false;
        }

        function editHours(participant) {
            /*
             * @todo Que funcione con un table o grid en vez de dialog
             */
        }

        function createANewParticipantElement(participantData){
        	let participantElement = {
        		AccountId: participantData.AccountId,
        		content:[participantData.Name]
        	}; 
        	return participantElement;
        }

        function addParticipantToVMParticipansBody(element, index, array){
        	vm.participants.body.push(createANewParticipantElement(element));
        }

        function addParticipantsToTable(participants){
        	participants.forEach(addParticipantToVMParticipansBody);
        }
    }
})();