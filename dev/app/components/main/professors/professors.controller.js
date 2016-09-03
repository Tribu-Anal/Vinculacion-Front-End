ProfessorsController.$inject = [ 'TbUtils', 'professors' ];

function ProfessorsController (TbUtils, professors) {
	const vm = this;

    vm.searchResults = []   ;
    vm.professorObj = term => { return { AccountId: term }; };

    vm.professors = [];
    vm.tableSchema = require('../../../table-schemas/users-table-schema');

    vm.pageSize = 10;
    vm.get = professors.getWithPagination;
    vm.hideLoadBtn = () => vm.professors.length !== vm.searchResults.length;

    vm.goToNewProfessor = () => { TbUtils.go('main.new-professor'); };
    vm.editProfessor = professor => { TbUtils.go('main.edit-professor', { professor: btoa(JSON.stringify(professor)) }); };

    vm.professorsLoading = true;

    TbUtils.getAndLoad(professors.getWithPagination, vm.professors, () => { vm.professorsLoading = false; }, 0, vm.pageSize);

}

module.exports = { name: 'ProfessorsController', ctrl: ProfessorsController };