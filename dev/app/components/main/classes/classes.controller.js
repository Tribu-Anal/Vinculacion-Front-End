ClassesController.$inject = [ 'TbUtils', 'classes' ];

function ClassesController (TbUtils, classes) {
	const vm = this,
	      pageSize = 10;

    let page = 0;

	vm.classes = [];
	vm.tableSchema = require('../../../table-schemas/classes-table-schema');

    vm.classObj = term => { return { Name: term }; };
    vm.searchResults = [];

	vm.loadMore = loadMore;
    vm.editClass = _class => { TbUtils.go('main.edit-class', { _class: btoa(JSON.stringify(_class)) }); };
	vm.preventGeneralLoading = TbUtils.preventGeneralLoading;
	vm.classesLoading = true;
	vm.loadingMore = false;

	loadMore();

	function loadMore() {
        if (vm.loadingMore) return;

        vm.loadingMore = true;
        classes.get(page, pageSize, loadMoreSuccess, loadMoreFailure);
    }

    function loadMoreSuccess (response) {
    	page++;

    	TbUtils.fillListWithResponseData(response.data, vm.classes);

    	vm.loadingMore = false;
    	vm.classesLoading = false;
    }

    function loadMoreFailure (response) {
    	TbUtils.showErrorMessage('error', response, 'No se pudo cargar mas clases.', 'Error');
    	vm.loadingMore = false;
    	vm.classesLoading = false;
    }

}

module.exports = { name: 'ClassesController', ctrl: ClassesController };