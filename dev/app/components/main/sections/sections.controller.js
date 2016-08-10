SectionsController.$inject = ['$rootScope', '$scope', '$state',
    'TbUtils', 'tableContent', 'sections', 'filterFilter'
];

function SectionsController($rootScope, $scope, $state,
    TbUtils, tableContent, sections, filterFilter) {
    if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor')
        $state.go('main.'+$rootScope.Role.toLowerCase()+'-dashboard');

    var vm = this;

    let defaultSectionTableBody = [];

    vm.limitInLettersToSearch = 3;

    vm.sectionsLoading = true;
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo', 'Año', 'Catedratico']);
    vm.sections = [];
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.options = {
        startingPage: 1,
        pageSize: 10
    };

    vm.sections = [];

    vm.loadMore = loadMore;
    vm.loadingMore = false;

    sections.getCurrentPeriodSections(getCPSectionsSuccess, getCPSectionsFailure);

    function getCPSectionsSuccess (response) {
        console.log(response.data.length);
        vm.options.pageSize = response.data.length;
        if (response.data.length <= 0) {
            vm.sectionsLoading = false;
            return;
        }

        constructTableBody(response, vm.sectionsTable.body);
        defaultSectionTableBody = vm.sectionsTable.body;
        TbUtils.fillListWithResponseData(response.data, vm.sections);

        vm.sectionsLoading = false;
    }

    function getCPSectionsFailure (response) {
        TbUtils.displayNotification('Error', 'Error', 'No se pudieron cargar los proyectos.');
    }

    function constructTableBody(response, tableSections) {
        for (let i = 0; i < response.data.length; i++) {
            let section = response.data[i];
            let name = 'N/A';

            if (section.User !== null)
                name = section.User.Name;

            let newTableElement = {
                content: [
                    tableContent.createALableElement(section.Code),
                    tableContent.createALableElement(section.Class.Name),
                    tableContent.createALableElement(section.Period.Number),
                    tableContent.createALableElement(section.Period.Year),
                    tableContent.createALableElement(name)
                ],
                data: section
            };

            tableSections.push(newTableElement);
        }
    }

    function loadMore () {
        if (vm.loadingMore) return;

        vm.loadingMore = true;
        sections.getSectionsWithPagination(vm.options.startingPage,
            vm.options.pageSize, getMoreSectionsSuccess, getMoreSectionsFail);
    }

    function getMoreSectionsSuccess (response) {
        constructTableBody(response, vm.sectionsTable.body);
        defaultSectionTableBody = vm.sectionsTable.body;
        vm.loadingMore = false;
        TbUtils.fillListWithResponseData(response.data, vm.sections);
        vm.options.startingPage++;
    }

    function getMoreSectionsFail (response) {
        TbUtils.displayNotification('Error', 'Error', 'No se pudieron cargar mas proyectos.');
        vm.loadingMore = false;
    }

    $scope.$watch('search.data', function(term) {
        let obj = {
            Class: {
                Name: term
            }
        };

        if(term && term.length >= vm.limitInLettersToSearch) {
            vm.searching = true;
            let filterSections = {data: filterFilter(vm.sections, obj)};
            let filterTable = [];
            constructTableBody(filterSections, filterTable);
            vm.sectionsTable.body = filterTable;
        }

        else {
            vm.sectionsTable.body = defaultSectionTableBody;
            vm.searching = false;
        }

    });

}

module.exports = {
    name: 'SectionsController',
    ctrl: SectionsController
};
