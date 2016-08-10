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
  vm.goToSection = goToSection;
  vm.toTitleCase = TbUtils.toTitleCase;
  vm.studentsLoading = true;
  vm.sectionsLoading = true;
  students.getAccountId(getAccountIdSuccess, getStudentHourReportFail);

  function getAccountIdSuccess(response){
      vm.accountId = response.data.AccountId;
      vm.name = response.data.Name;
      hours.getStudentHourReport(vm.accountId, getStudentHourReportSuccess, getStudentHourReportFail);
      students.getSectionHours(vm.accountId, getSectionHoursSuccess, getSectionHoursFail);
  }

  function goToSection(id){
    TbUtils.preventGeneralLoading();
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

  function getSectionHoursSuccess(response) {
    vm.sections = response.data;
    vm.sectionsLoading = false;
  }

  function getSectionHoursFail(response) {
    TbUtils.displayNotification('Error', 'Error con las Horas de Secciones',
      'No se pudieron cargar las horas de una seccion.');
    vm.sectionsLoading = false;
  }


}

module.exports = { name: 'StudentDashboardController', ctrl: StudentDashboardController };
