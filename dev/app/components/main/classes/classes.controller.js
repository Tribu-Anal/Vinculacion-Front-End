ClassesController.$inject = [ 'TbUtils', 'classes' ];

function ClassesController (TbUtils, classes) {
	const vm = this;

    vm.pageSize = 10;
    vm.get = classes.getAndLoad;
    vm.hideLoadBtn = () => vm.classes.length !== vm.searchResults.length;

	vm.classes = [];
	vm.tableSchema = require('../../../table-schemas/classes-table-schema');

    vm.searchResults = [];
    vm.classObj = term => { return { Name: term }; };

    vm.editClass = _class => { TbUtils.go('main.edit-class', { _class: btoa(JSON.stringify(_class)) }); };
	vm.goToNewClass = () => { TbUtils.go('main.new-class'); };

	vm.classesLoading = true;

    classes.getAndLoad(0, vm.pageSize, vm.classes, () => { vm.classesLoading = false; });

}

module.exports = { name: 'ClassesController', ctrl: ClassesController };