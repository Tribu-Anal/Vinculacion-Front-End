SectionsController.$inject = ['$rootScope', '$scope', '$state',
    'TbUtils', 'tableContent', 'sections'
];

function SectionsController($rootScope, $scope, $state,
    TbUtils, tableContent, sections) {
    if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor')
        $state.go('main.projects');

    var vm = this;

    vm.sectionsLoading = true;
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo', 'Año', 'Catedratico']);
    vm.goSection = goSection;
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.options = {};
    vm.options.startingPage = 0;
    vm.options.pageSize = 60;
    vm.options.count = 0;
    vm.onPageChange = onPageChange;


    // sections.getSections(getSectionsSuccess, getSectionsFail);

    function goSection(index) {
        console.log("Entro");
    }

    function getSectionsSuccess(response) {
        console.log(response.data.length);
        if (response.data.length <= 0) {
            vm.sectionsLoading = false;
            return;
        }

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

            vm.sectionsTable.body.push(newTableElement);
        }

        vm.sectionsLoading = false;
    };

    sections.getSectionCount(getSectionCountSuccess, getSectionCountFail);

    function getSectionCountSuccess(response) {
        vm.options.count = response.data[0].Id;
        vm.sectionsLoading = true;
        sections.getSectionsWithPagination(vm.options.startingPage,
            vm.options.pageSize, getSectionsSuccess, getSectionsFail);
    }

    function getSectionCountFail() {
        getSectionsFail();
    }

    function getSectionsFail() {
        vm.sectionsLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
    }

    function onPageChange(skip, page) {
        vm.sectionsTable.body = [];
        vm.sectionsLoading = true;
        sections.getSectionsWithPagination(page, skip,
            getSectionsSuccess, getSectionsFail);
    }
}

module.exports = {
    name: 'SectionsController',
    ctrl: SectionsController
};