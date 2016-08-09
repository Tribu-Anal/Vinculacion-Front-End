SectionsController.$inject = ['$rootScope', '$scope', '$state',
    'TbUtils', 'tableContent', 'sections', 'filterFilter'
];

function SectionsController($rootScope, $scope, $state,
    TbUtils, tableContent, sections, filterFilter) {
    if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor')
        $state.go('main.'+$rootScope.Role.toLowerCase()+'-dashboard');

    var vm = this;

    vm.limitInLettersToSearch = 3;

    vm.sectionsLoading = true;
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo', 'Año', 'Catedratico']);
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.options = {
        startingPage: 1,
        pageSize: 26
    };

    vm.sections = [];

    vm.loadMore = loadMore;

    sections.getCurrentPeriodSections(getCPSectionsSuccess, getCPSectionsFailure);

    function getCPSectionsSuccess (response) {
        console.log(response.data.length);
        if (response.data.length <= 0) {
            vm.sectionsLoading = false;
            return;
        }

        constructTableBody(response, vm.sectionsTable.body);

        vm.sectionsLoading = false;
    }

    function getCPSectionsFailure (response) {
        
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
        sections.getSectionsWithPagination(vm.options.startingPage,
            vm.options.pageSize, getSectionsSuccess, getSectionsFail);
    }

    function getSectionsSuccess (response) {
        constructTableBody(response, vm.sectionsTable.body);
        vm.options.startingPage++;
    }

    function getSectionsFail (response) {
        TbUtils.displayNotification('Error', 'Error', 'No se pudieron cargar mas proyectos.')
    }

}

module.exports = {
    name: 'SectionsController',
    ctrl: SectionsController
};
