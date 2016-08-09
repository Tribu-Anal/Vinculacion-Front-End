ProfessorDashboardController.$inject = ['$rootScope', '$stateParams', 'TbUtils',
    'sections', 'students', 'tableContent', '$state'];

function ProfessorDashboardController($rootScope, $stateParams, TbUtils, sections, students, tableContent
                                      , $state) {
    var vm = this;

    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo']);
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.sectionsLoading = true;

    sections.getCurrentSections(currentSectionsSuccess, currentSectionsFail);
    console.log('Profesor');

    function currentSectionsSuccess(response) {
        if (response.data.length <= 0)
            return;

        for (let i = 0; i < response.data.length; i++) {
            let section = response.data[i];
            let newTableElement = {
                content: [
                    tableContent.createALableElement(section.Code),
                    tableContent.createALableElement(getClassName(section)),
                    tableContent.createALableElement(getPeriod(section))
                ],
                data: section
            };
            vm.sectionsTable.body.push(newTableElement);
        }

        vm.sectionsLoading = false;
        console.log(vm.sectionsTable.body);
    }

    function currentSectionsFail(response) {
        console.log(response);
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar las secciones correctamente.');
    }

    function getClassName(section) {
        return section.Class.Name
    }

    function getPeriod(section) {
        return section.Period.Number + " - " + section.Period.Year
    }
}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };
