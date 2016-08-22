
describe('StudentDashboardController', function(){
  var ctrl, scope, state, TbUtils, tableContent, sections, filterFilter, hours, students;

  'use strict';

  beforeEach(module('VinculacionApp'));

  beforeEach(inject(function($rootScope, $controller, $state, _TbUtils_, _tableContent_,
                                        _sections_, _filterFilter_, _hours_, _students_){
  $rootScope.Role = 'Student';

  scope = $rootScope.$new();
  state = $state;
  TbUtils = _TbUtils_;
  tableContent = _tableContent_;
  sections = _sections_;
  filterFilter = _filterFilter_;
  hours = _hours_;
  students = _students_;

  ctrl = $controller('StudentDashboardController', {
    $scope: scope,
    $state: state,
    TbUtils: TbUtils,
    tableContent: tableContent,
    sections: sections,
    filterFilter: filterFilter,
    hours: hours,
    students: students
  });
  }));

  describe('limitProjects', function(){
      it('should return an array of 4 projects maximum', function(){
        let origin = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6'];
        let result = ctrl.limitProjects(origin);
        expect(result).toEqual(['Project1', 'Project2', 'Project3', 'Project4']);
      });
    });

});
