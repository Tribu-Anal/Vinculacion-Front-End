ClassesController.$inject = [ '$scope', 'TbUtils', 'classes', 'filterFilter' ];

function ClassesController (scope, TbUtils, classes, filterFilter) {
	const vm = this,
	      pageSize = 10,
          minCharsToSearch = 3;

    let page = 0,
        classesTemp = [];

	vm.classes = [];
	vm.tableSchema = require('../../../table-schemas/classes-table-schema');

	vm.loadMore = loadMore;
    vm.editClass = _class => { TbUtils.go('main.edit-class', { classId: _class.Id }); };
	vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
	vm.classesLoading = true;
	vm.loadingMore = false;
	vm.searching = false;

	scope.$watch('search.data', search);

	loadMore();

	function loadMore() {
        if (vm.loadingMore) return;

        vm.loadingMore = true;
        classes.get(page, pageSize, loadMoreSuccess, loadMoreFailure);
    }

    function loadMoreSuccess (response) {
    	page++;

    	TbUtils.fillListWithResponseData(response.data, vm.classes);
    	classesTemp = vm.classes;

    	vm.loadingMore = false;
    	vm.classesLoading = false;
    }

    function loadMoreFailure (response) {
    	TbUtils.showErrorMessage('error', response, 'No se pudo cargar mas clases.', 'Error');
    	vm.loadingMore = false;
    	vm.classesLoading = false;
    }

    function search (term) {
        if (term && term.length >= minCharsToSearch) {
            vm.searching = true;
            vm.classes = filterFilter(vm.classes, { Name: term });
        } else {
            vm.classes = classesTemp;
            vm.searching = false;
        }
    }

}

module.exports = { name: 'ClassesController', ctrl: ClassesController };