(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$stateParams', 'projects', 'TbUtils', 'tableContent', 'horas'];

    function ProjectController($stateParams, projects, TbUtils,tableContent, horas) {
        var vm = this;

        vm.project = {};
        vm.projectLoading = true;
        vm.participantsLoading = true;
        vm.participants = {
            headers: [
                'Alumno',
                'Horas',
                ' ',
                '  '
            ],
            body: [],
            actions: false
        };
        vm.sectionIds = [];
        projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);
        projects.getParticipants($stateParams.projectId, getParticipantsSuccess, getParticipantsFail);

        function getProjectSuccess(response) {
	    	vm.sectionIds = response.data.SectionIds;
            vm.project = response.data;
            vm.projectLoading = false;
        }

        function getProjectFail() {
            TbUtils.displayNotification('error', 'Error',
                'El proyecto deseado no existe.');
            vm.projectLoading = false;
        }

        function getParticipantsSuccess(response) {
            addParticipantsToTable(response.data);
            vm.participantsLoading = false;
        }

        function getParticipantsFail() {
            TbUtils.displayNotification('error', 'Error',
                'Hubo error al momento de cargar a los alumnos.');
            vm.participantsLoading = false;
        }

        function editHours(participant) {
           participant.hours = getHoursOfParticipant(participant);
           let hoursData= {
	       	   AccountId: participant.AccountId,
			   SectionId: vm.sectionIds[0],
			   ProjectId: $stateParams.projectId,
			   Hour: participant.hours
           }
           //horas.postHours(hoursData,addHoursSuccess,addHoursFail);
        }

        function addHoursSuccess(){
        	TbUtils.displayNotification('success', 'Horas Actualizadas', 
                'Se han registrado las horas del alumno exitosamente.');
        }

        function addHoursFail(){
        	TbUtils.displayNotification('error', 'Error',
                'Error inesperado al momento de guardar las horas.');
        }

        function getHoursOfParticipant(participant){
        	let hoursInput = participant.content[1];
        	let hoursValue = hoursInput.properties.value;
        	return hoursValue;
        }

        /*si viene de la bd y ocupamos agregarles horas utilizar esto
        	caso contrario, eliminar la funcion
        function setHoursOfParticipant(participant, hours){
        	participant.content[1].hoursInput.properties.value = hours;
        	return participant;
        }
        */

        function createANewParticipantElement(participantData) {
            let participantElement = {
                AccountId: participantData.AccountId,
                content: []
            };
			participantElement.content.push(
        		tableContent.createALableElement(participantData.Name),
        		tableContent.createAnInputElement('number'),
        		tableContent.createAButtonElement({icon:'glyphicon-floppy-disk', onClick:editHours})
    		);
    		return participantElement;
    	}

        function addParticipantToVMParticipansBody(element, index, array) {
            vm.participants.body.push(createANewParticipantElement(element));
        }

        function addParticipantsToTable(participants) {
            participants.forEach(addParticipantToVMParticipansBody);
        }
    }
})();