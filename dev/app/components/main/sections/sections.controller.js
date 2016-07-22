SectionsController.$inject = ['$rootScope', '$scope', '$state', 
								  'TbUtils', 'tableContent', 'sections'];

function SectionsController ($rootScope, $scope, $state, TbUtils, tableContent, sections) {
	if ($rootScope.Role !== 'Admin' && $rootScope.Role !== 'Professor') $state.go('main.projects');
	
	var vm = this;
    
    vm.sectionsLoading = true;
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo', 'Año', 'Catedratico']);        
    vm.goSection = goSection;
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
    
    sections.getSections(getSectionsSuccess, getSectionsFail);
    
    function goSection(index) {
        console.log("Entro");
    }

    function getSectionsSuccess(response) {
        if (response.data.length <= 0) {
            vm.sectionsLoading = false;
            return;
        }

        for (let i = 0; i < response.data.length; i++) {
            let section = response.data[i];
            let name = 'N/A';
            
            if(section.User !== null)
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
    
    function getSectionsFail(response) {
        console.log(response);
    }
}

module.exports = { name: 'SectionsController', ctrl: SectionsController };