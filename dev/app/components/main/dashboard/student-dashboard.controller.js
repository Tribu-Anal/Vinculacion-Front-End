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
  students.getAccountId(getAccountIdSuccess, getAccountIdFail);
  sections.getCurrentPeriodSections(getCurrentPeriodSectionsSuccess, getCurrentPeriodSectionsFail);

  console.log('Estudiante');

  function getAccountIdSuccess(response){
      vm.accountId = response.data.AccountId;
      vm.name = response.data.Name;
      hours.getStudentHourReport(vm.accountId, getStudentHourReportSuccess, getStudentHourReportFail);
      console.log(response);
  }
  function getAccountIdFail(response){
      console.log(response);
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
  function getStudentHourReportSuccess(response){
    vm.totalHours = response.data.TotalHours;
    vm.projects = limitProjects(response.data.Projects);
    console.log(response);
  }

  function getStudentHourReportFail(response){
    console.log(response);
  }

  function getCurrentPeriodSectionsSuccess(response){
    vm.sections = response.data;
    for(obj in vm.sections){
      students.getSectionHours(vm.accountId, vm.sections[obj].Id, getSectionHoursSuccess, getSectionHoursFail);
    }
    console.log("Sections data");
    console.log(vm.sections);
  }

  function getSectionHoursSuccess(response){
    console.log("Todo bien!");
    vm.sectionhours = response.data;
    console.log(response);
  }

  function getSectionHoursFail(response){
    console.log("Todo mal!");
    console.log(response);
  }

  function getCurrentPeriodSectionsFail(response){
    console.log(response);
  }

}

module.exports = { name: 'StudentDashboardController', ctrl: StudentDashboardController };
