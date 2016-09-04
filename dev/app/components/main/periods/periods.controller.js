PeriodsController.$inject = [ 'TbUtils', 'periods' ];

function PeriodsController (TbUtils, periods) {
	const vm = this;

    vm.searchResults = []   ;
    vm.searchObj = term => { return { Year: term }; };

    vm.periods = [];
    vm.tableSchema = require('../../../table-schemas/periods-table-schema');

    vm.pageSize = 10;
    vm.get = periods.getWithPagination;
    vm.getAll = periods.get;
    vm.hideLoadBtn = () => vm.periods.length !== vm.searchResults.length;

    vm.goToNewPeriod = () => { TbUtils.go('main.new-period'); };
    vm.editPeriod = period => { TbUtils.go('main.edit-period', { period: btoa(JSON.stringify(period)) }); };

    vm.loading = true;

    TbUtils.getAndLoad(periods.getWithPagination, vm.periods, () => { vm.loading = false; }, 0, vm.pageSize);

}

module.exports = { name: 'PeriodsController', ctrl: PeriodsController };