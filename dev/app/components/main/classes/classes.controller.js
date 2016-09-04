ClassesController.$inject = [ 'TbUtils', 'classes' ];

function ClassesController (TbUtils, classes) {
	const vm = this;

    vm.searchResults = [];
    vm.classObj = term => { return { Name: term }; };

    vm.classes = [];
    vm.tableSchema = require('../../../table-schemas/classes-table-schema');

    vm.pageSize = 10;
    vm.get = classes.getWithPagination;
    vm.getAll = classes.get;
    vm.hideLoadBtn = () => vm.classes.length !== vm.searchResults.length;

    vm.goToNewClass = () => { TbUtils.go('main.new-class'); };
    vm.editClass = _class => { TbUtils.go('main.edit-class', { _class: btoa(JSON.stringify(_class)) }); };

	vm.loading = true;

    TbUtils.getAndLoad(classes.getWithPagination, vm.classes, () => { vm.loading = false; }, 0, vm.pageSize);

}

module.exports = { name: 'ClassesController', ctrl: ClassesController };