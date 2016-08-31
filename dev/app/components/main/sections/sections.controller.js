SectionsController.$inject = [ '$rootScope', '$scope', '$state',
                               'TbUtils', 'sections', 'filterFilter' ];

function SectionsController($rootScope, $scope, $state,
                            TbUtils, sections, filterFilter) {

    var vm = this;

    vm.limitInLettersToSearch = 3;

    vm.sectionsLoading = true;
    vm.sectionsTable = null;
    vm.sections = [];
    vm.sectionsTableSchema = require('../../../table-schemas/ext-sections-table-schema');
    vm.goToSection = section => { TbUtils.go('main.section', { sectionId: section.Id }); };
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.sectionsTemp = [];

    vm.options = {
        startingPage: 1,
        pageSize: 10
    };

    vm.loadMore = loadMore;
    vm.loadingMore = false;

    sections.getCurrentPeriodSections(getCPSectionsSuccess, getCPSectionsFailure);

    $scope.$watch('search.data', search);

    function getCPSectionsSuccess(response) {
        vm.options.pageSize = response.data.length;
        vm.sectionsTemp = vm.sections = response.data;
        vm.sectionsLoading = false;
    }

    function getCPSectionsFailure(response) {
        TbUtils.displayNotification('Error', 'Error', 'No se pudieron cargar los proyectos.');
    }

    function loadMore() {
        if (vm.loadingMore) return;

        vm.loadingMore = true;
        sections.getSectionsWithPagination(vm.options.startingPage,
            vm.options.pageSize, getMoreSectionsSuccess, getMoreSectionsFail);
    }

    function getMoreSectionsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.sections);
        vm.sectionsTemp = vm.sections;
        vm.loadingMore = false;
        vm.options.startingPage++;
    }

    function getMoreSectionsFail(response) {
        TbUtils.displayNotification('Error', 'Error', 'No se pudieron cargar mas proyectos.');
        vm.loadingMore = false;
    }

    function search (term) {
        let obj = {
            Class: {
                Name: term
            }
        };

        if (term && term.length >= vm.limitInLettersToSearch) {
            vm.searching = true;
            vm.sections = filterFilter(vm.sections, obj);
        } else {
            vm.sections = vm.sectionsTemp;
            vm.searching = false;
        }
    }

}

module.exports = {
    name: 'SectionsController',
    ctrl: SectionsController
};