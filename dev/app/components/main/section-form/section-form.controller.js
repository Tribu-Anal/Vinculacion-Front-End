(function () {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionFormController', SectionFormController);

    SectionFormController.$inject = [ '$rootScope', '$state', 'TbUtils', 'sections', 'sectionData' ];

    function SectionFormController ($rootScope, $state, TbUtils, sections, sectionData) {
        if ($rootScope.Role !== 'Admin') $state.go('dashboard.home');

        var vm = this;

        vm.classes = [];
        vm.professors = [];
        vm.periods = [];
        vm.classesLoading = true;
        vm.professorsLoading = true;
        vm.periodsLoading = true;
        vm.submitting = false;
        vm.section = {};
        vm.submit = submit;

        getClasses();
        getProfessors();
        getPeriods();

        function submit () {
        	vm.submitting = true;

        	sections.postSection(vm.section,
        		submitSuccess, submitFailure);
        }

        function submitSuccess (response) {
        	TbUtils.displayNotification('success', 'Seccion Creada', 
        		'La seccion se creo exitosamente.');

        	$state.go('dashboard.home');
        	vm.submitting = false;
        }

        function submitFailure (response) {
        	TbUtils.displayNotification('error', 'Error', 
        		'Han habido problemas al crear la seccion.');
        	vm.submitting = false;
        }

        function getClasses () {
        	sectionData.getClasses(getClassesSuccess, getClassesFailure);
        }

        function getClassesSuccess (response) {
        	TbUtils.fillListWithResponseData(response.data, vm.classes);
        	vm.classesLoading = false;
        }

        function getClassesFailure (response) {
        	TbUtils.displayNotification('error', 'Error', 
        		'No se pudieron cargar las clases.');
        	vm.classesLoading = false;
        }

        function getProfessors () {
        	sectionData.getProfessors(getProfessorsSuccess, getProfessorsFailure);
        }

        function getProfessorsSuccess (response) {
        	TbUtils.fillListWithResponseData(response.data, vm.professors);
        	vm.professorsLoading = false;
        }

        function getProfessorsFailure (response) {
        	TbUtils.displayNotification('error', 'Error', 
        		'No se pudieron cargar los profesores.');
        	vm.professorsLoading = false;
        }

        function getPeriods () {
        	sectionData.getPeriods(getPeriodsSuccess, getPeriodsFailure);
        }

        function getPeriodsSuccess (response) {
        	TbUtils.fillListWithResponseData(response.data, vm.periods);
        	vm.periodsLoading = false;
        }

        function getPeriodsFailure (response) {
        	TbUtils.displayNotification('error', 'Error', 
        		'No se pudieron cargar los periodos.');
        	vm.periodsLoading = false;
        }

    }
})();