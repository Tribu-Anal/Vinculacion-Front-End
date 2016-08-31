ProfessorDashboardController.$inject = [ 'TbUtils', 'sections' ];

function ProfessorDashboardController(TbUtils, sections) {
    var vm = this;

    vm.sections = null;
    vm.sectionTableModel = require('../../../table-models/sections-table-model');
    vm.goToSection = goToSection;
    vm.sectionsLoading = true;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);

    function goToSection (section) {
        TbUtils.go('main.section', { sectionId: section.Id });
    }

    function currentSectionsSuccess(response) {
        vm.sections = vm.sectionTableModel.data = response.data;
        vm.sectionsLoading = false;
    }

    function currentSectionsFail(response) {
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
        vm.sectionsLoading = false;
    }

}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };