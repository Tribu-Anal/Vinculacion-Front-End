ProfessorDashboardController.$inject = ['$rootScope', '$stateParams', 'TbUtils', 
    'sections', 'students', 'tableContent'];

function ProfessorDashboardController($rootScope, $stateParams, TbUtils, sections, students, tableContent) {
    var vm = this;

    vm.currentProjects = [];
    vm.sectionsTable = TbUtils.getTable(['Codigo', 'Clase', 'Periodo']);
    vm.projectsTable = TbUtils.getTable(['Id Proyecto', 'Nombre', 'Evaluar Proyecto']);
    vm.preventGeneralLoading = TbUtils.preventGeneralLoading;

    vm.sectionsLoading = true;
    //vm.projectsLoading = true;
    vm.getCurrentProjects = getCurrentProjects;

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
        getCurrentProjects();
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

    function getCurrentProjects() {

        for(section in vm.sectionsTable.body) {
            getProjectsBySection(vm.sectionsTable.body[section].data.Id);
        }
    }

    function getProjectsBySection(sectionId) {
        sections.getProjects(sectionId, getProjectsSuccess, getProjectsFail);
    }

    function getProjectsSuccess(response) {
        // for(prj in response.data) {
        //     if(!findDuplicatesProjects(response.data[prj].Id))
        //         vm.currentProjects.push(response.data[prj]);
        // }
        // console.log(vm.currentProjects);

            for (let i = 0; i < response.data.length; i++) {
                let project = response.data[i];

                // for(prj in response.data) {
                //     if(!findDuplicatesProjects(response.data[prj].Id)
                //         vm.currentProjects.push(response.data[prj]);
                // }

                let newTableElement = {
                    content: [
                        tableContent.createALableElement(project.ProjectId),
                        tableContent.createALableElement(project.Name)
                    ],

                    data: project
                };

                vm.projectsTable.body.push(newTableElement);        
        }
    }

    function getProjectsFail(response) {
        console.log(response);
    }

    function findDuplicatesProjects(projectId) {
        for(prj in vm.projectsTable.body) {
            if(projectId === vm.projectsTable.body[prj].data.Id) return true;
        }

        return false;
    }
}

module.exports = { name: 'ProfessorDashboardController', ctrl: ProfessorDashboardController };