ProfessorDashboardController.$inject = [ 'TbUtils', 'sections' ];

function ProfessorDashboardController(TbUtils, sections) {
    var vm = this;

    vm.sections = null;
    vm.tableSchema = require('../../../table-schemas/sections-table-schema');
    vm.goToSection = goToSection;
    vm.sectionsLoading = true;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);

    function goToSection (section) {
        TbUtils.go('main.section', { section: btoa(JSON.stringify(section)) });
    }

    function currentSectionsSuccess(response) {
        vm.sections = response.data;
        vm.sectionsLoading = false;
    }

    function currentSectionsFail(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
        vm.sectionsLoading = false;
    }

}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };