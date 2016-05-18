(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = [ '$rootScope', '$stateParams', '$state', 'projects', 
                                  'TbUtils', 'tableContent', 'horas', 'recentProjects'];

    function ProjectController($rootScope, $stateParams, $state, projects, TbUtils, tableContent, horas, recentProjects) {
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
        vm.saveButton = {
            icon: 'glyphicon-floppy-disk',
            onClick: editHours,
            tooltip: 'Agregar Horas'
        };
        vm.downloadButton = {
            icon: 'glyphicon-file',
            onClick: downloadReport,
            tooltip: 'Ver Reporte'
        };
        vm.sectionIds = [];

        projects.getProject($stateParams.projectId, getProjectSuccess, getProjectFail);
        projects.getParticipants($stateParams.projectId, getParticipantsSuccess, getParticipantsFail);

        function getProjectSuccess(response) {
            vm.sectionIds = response.data.SectionIds;
            vm.project = response.data;

            recentProjects.put($rootScope.Session, vm.project.Id);
            vm.projectLoading = false;
        }

        function getProjectFail(response) {
            TbUtils.showErrorMessage('error', response,
                'El proyecto deseado no existe.',
                'Error');

            $state.go('dashboard.home');

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
            console.log(participant.hours);

            if (!participant.hours) {
                TbUtils.displayNotification('error', 'Error',
                    'Debe ingresar las  horas a guardar.');
                return;
            }

            let hoursData = {
                AccountId: participant.AccountId,
                SectionId: vm.sectionIds[0],
                ProjectId: $stateParams.projectId,
                Hour: participant.hours
            }

            horas.postHours(hoursData, addHoursSuccess, addHoursFail);
        }

        function addHoursSuccess() {
            TbUtils.displayNotification('success', 'Horas Actualizadas',
                'Se han registrado las horas del alumno exitosamente.');
        }

        function addHoursFail() {
            TbUtils.displayNotification('error', 'Error',
                'Error inesperado al momento de guardar las horas.');
        }

        function getHoursOfParticipant(participant) {
            let hoursInput = participant.content[1];
            let hoursValue = hoursInput.properties.value;
            return hoursValue;
        }

        function createANewParticipantElement(participantData) {
            let participantElement = {
                AccountId: participantData.AccountId,
                Major: getMajor(participantData.Major),
                Campus: participantData.Campus,
                Name: participantData.Name,
                content: []
            };
            participantElement.content.push(
                tableContent.createALableElement(participantData.Name),
                tableContent.createAnInputElement('number'),
                tableContent.createAButtonElement(vm.saveButton),
                tableContent.createAButtonElement(vm.downloadButton)
            );

            return participantElement;
        }

        function addParticipantToVMParticipansBody(element, index, array) {
            vm.participants.body.push(createANewParticipantElement(element));
        }

        function addParticipantsToTable(participants) {
            participants.forEach(addParticipantToVMParticipansBody);
        }

        function downloadReport(participant) {
            let params = {
                templateUrl: 'reports/hours-by-student/hours-by-student.html',
                previousState: 'dashboard.project',
                previousStateParams: {
                    projectId: $stateParams.projectId
                },
                reportParams: getReportParams(participant)
            }
            TbUtils.preventGeneralLoading();
            $state.go('dashboard.printarea', {
                params: params
            });
        }

        function getMajor(Major) {
            return Major.Name;
        }

        function getReportParams(participant) {
            let reportParams = {
                AccountId: participant.AccountId,
                Campus: participant.Campus,
                Major: participant.Major,
                Name: participant.Name
            }

            return reportParams;
        }
    }
})();