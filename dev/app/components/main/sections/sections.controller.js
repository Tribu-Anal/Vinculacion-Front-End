SectionsController.$inject = [ 'TbUtils', 'sections' ];

function SectionsController (TbUtils, sections) {
	const vm = this;

    vm.searchResults = []   ;
    vm.sectionObj = term => { return { Class: { Name: term } }; };

    vm.sections = [];
    vm.tableSchema = require('../../../table-schemas/ext-sections-table-schema');
    vm.goToSection = section => { TbUtils.go('main.section', { sectionId: section.Id }); };

    vm.pageSize = 10;
    vm.get = sections.getSectionsWithPagination;
    vm.hideLoadBtn = () => vm.sections.length !== vm.searchResults.length;

    vm.goToNewSection = () => { TbUtils.go('main.new-section'); };
    vm.sectionsLoading = true;

    TbUtils.getAndLoad(sections.getCurrentPeriodSections, vm.sections, () => { vm.sectionsLoading = false; });

}

module.exports = { name: 'SectionsController', ctrl: SectionsController };