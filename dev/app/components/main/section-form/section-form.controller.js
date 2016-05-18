(function () {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('SectionFormController', SectionFormController);

    SectionFormController.$inject = [ '$state', 'TbUtils', 'sections', 'sectionData' ];

    function SectionFormController ($state, TbUtils, sections, sectionData) {
        var vm = this;

        vm.classes = [{Id: 0, Name:'Organizacion de Computadoras'},
        {Id: 1, Name:'Sistemas Operativos I'}, {Id: 2, Name:'Sistemas Operativos II'}];
        vm.professors = [{Id: '029912', Name:'Kelvin Chinchilla'}, {Id: '133838', Name:'Ale Ferrera'}];
        vm.periods = [{Id: 0, Number: 1, Year: 2016}, {Id: 1,Number: 4, Year: 2016}];
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
        	// sections.postSection(JSON.stringify(vm.section), 
        	// 	submitSuccess, submitFailure);
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