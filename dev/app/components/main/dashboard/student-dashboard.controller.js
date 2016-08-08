StudentDashboardController.$inject = ['$rootScope', '$scope', '$state',
    'TbUtils', 'tableContent', 'sections', 'filterFilter', 'hours', 'students'];

function StudentDashboardController ($rootScope, $scope, $state, TbUtils, tableContent,
                                      sections, filterFilter, hours, students) {
  if($rootScope.Role !== 'Student' ){
    $state.go('main.'+$rootScope.Role.toLowerCase()+'-dashboard');
    return;
  }

	const vm = this;
  vm.accountId;
  vm.totalHours;
  vm.name;
  vm.projects = [];
  vm.sections = [];
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
    console.log("Sections data");
    console.log(vm.sections);
  }

  function getCurrentPeriodSectionsFail(response){
    console.log(response);
  }

  // // sections.getSections(getSectionsSuccess, getSectionsFail);
  //
  // function goSection(index) {
  //     console.log("Entro");
  // }
  //
  // sections.getSections(getTotalSectionsSuccess, getTotalSectionsFail);
  //
  // function getTotalSectionsSuccess(response) {
  //     console.log(response);
  //     TbUtils.fillListWithResponseData(response.data, vm.totalSections);
  // }
  //
  // $scope.$watch('search.data', function(term) {
  //     let obj = {
  //         Class: {
  //             Name: term
  //         }
  //     };
  //
  //     if(term && term.length >= vm.limitInLettersToSearch) {
  //         let filterSections = {data: filterFilter(vm.totalSections, obj)};
  //         let filterTable = [];
  //         constructTableBody(filterSections, filterTable);
  //         vm.sectionsTable.body = filterTable;
  //     }
  //
  //     else {
  //         console.log('vacio');
  //         vm.sectionsTable.body = vm.paginationSections;
  //     }
  // });
  //
  // function getTotalSectionsFail(response) {
  //     console.log(response);
  // }
  //
  // function getSectionsSuccess(response) {
  //     console.log(response.data.length);
  //     if (response.data.length <= 0) {
  //         vm.sectionsLoading = false;
  //         return;
  //     }
  //
  //     constructTableBody(response, vm.paginationSections);
  //
  //     vm.sectionsTable.body = vm.paginationSections;
  //     vm.sectionsLoading = false;
  // };
  //
  // function constructTableBody(response, tableSections) {
  //     for (let i = 0; i < response.data.length; i++) {
  //         console.log('Entro');
  //         let section = response.data[i];
  //         let name = 'N/A';
  //
  //         if (section.User !== null)
  //             name = section.User.Name;
  //
  //         let newTableElement = {
  //             content: [
  //                 tableContent.createALableElement(section.Code),
  //                 tableContent.createALableElement(section.Class.Name),
  //                 tableContent.createALableElement(section.Period.Number),
  //                 tableContent.createALableElement(section.Period.Year),
  //                 tableContent.createALableElement(name)
  //             ],
  //             data: section
  //         };
  //
  //         //vm.sectionsTable.body.push(newTableElement);
  //         tableSections.push(newTableElement);
  //     }
  // }
  //
  // sections.getSectionCount(getSectionCountSuccess, getSectionCountFail);
  //
  // function getSectionCountSuccess(response) {
  //     vm.options.count = response.data[0].Id;
  //     vm.sectionsLoading = true;
  //     sections.getSectionsWithPagination(vm.options.startingPage,
  //         vm.options.pageSize, getSectionsSuccess, getSectionsFail);
  // }
  //
  // function getSectionCountFail() {
  //     getSectionsFail();
  // }
  //
  // function getSectionsFail() {
  //     vm.sectionsLoading = false;
  //     TbUtils.displayNotification('error', 'Error',
  //         'No se pudieron cargar las secciones correctamente.');
  // }
  //
  // function onPageChange(skip, page) {
  //     if($scope.search) $scope.search.data = '';
  //     vm.sectionsTable.body = [];
  //     vm.paginationSections = [];
  //     vm.sectionsLoading = true;
  //     sections.getSectionsWithPagination(page, skip,
  //         getSectionsSuccess, getSectionsFail);
  // }
}

module.exports = { name: 'StudentDashboardController', ctrl: StudentDashboardController };
