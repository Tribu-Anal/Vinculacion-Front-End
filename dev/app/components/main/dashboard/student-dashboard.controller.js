StudentDashboardController.$inject = ['$rootScope', '$scope', '$state',
    'TbUtils', 'tableContent', 'sections', 'filterFilter', 'hours', 'students'];

function StudentDashboardController ($rootScope, $scope, $state, TbUtils, tableContent,
                                      sections, filterFilter, hours, students) {
  if($rootScope.Role !== 'Student' ){
    $state.go('main.'+$rootScope.Role.toLowerCase()+'-dashboard');
    return;
  }

	const vm = this;
  vm.accountId = null;
  vm.totalHours = null;
  vm.name = null;
  vm.projects = [];
  vm.sections = [];
  vm.sectionhours = null;
  vm.goToSection = goToSection;
  vm.toTitleCase = TbUtils.toTitleCase;
  vm.studentsLoading = true;
  vm.sectionsLoading = true;
  students.getAccountId(getAccountIdSuccess, getStudentHourReportFail);
  sections.getSections(getCurrentPeriodSectionsSuccess, getCurrentPeriodSectionsFail);

  console.log('Estudiante');

  function getAccountIdSuccess(response){
      vm.accountId = response.data.AccountId;
      vm.name = response.data.Name;
      hours.getStudentHourReport(vm.accountId, getStudentHourReportSuccess, getStudentHourReportFail);
  }

  function goToSection(id){
    $state.go('main.section',{
      sectionId: id
    });
  }

  function limitProjects(projects){
      prjs = [];
      if(projects.length >= 4){
        for(i = 0; i < 4; i++){
          prjs[i] = projects[i];
        }
        return prjs;
      }else{
        return projects;
      }
  }
  function getStudentHourReportSuccess(response) {
    vm.totalHours = response.data.TotalHours;
    vm.projects = limitProjects(response.data.Projects);
    vm.studentsLoading = false;
  }

  function getStudentHourReportFail(response) {
    TbUtils.displayNotification('Error', 'Error con Reportes', 'No se pudieron cargar las horas de los proyectos.');
    vm.studentsLoading = false;
  }

  function getCurrentPeriodSectionsSuccess(response) {
    vm.sections = response.data;
    for(obj in vm.sections)
      students.getSectionHours(vm.accountId, vm.sections[obj].Id, getSectionHoursSuccess, getSectionHoursFail);
  }

  function getSectionHoursSuccess(response) {
    vm.sectionhours = response.data;
    vm.sectionsLoading = false;
  }

  function getSectionHoursFail(response) {
    TbUtils.displayNotification('Error', 'Error con las Horas de Secciones', 
      'No se pudieron cargar las horas de una seccion.');
    vm.sectionsLoading = false;
  }

  function getCurrentPeriodSectionsFail(response){
    TbUtils.displayNotification('Error', 'Error con Secciones', 'No se pudieron cargar las secciones.');
    vm.sectionsLoading = false;
  }

}

module.exports = { name: 'StudentDashboardController', ctrl: StudentDashboardController };
