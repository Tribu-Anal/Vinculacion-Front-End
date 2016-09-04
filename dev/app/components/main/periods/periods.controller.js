PeriodsController.$inject = [ 'TbUtils', 'periods' ];

function PeriodsController (TbUtils, periods) {
	const vm = this;

    vm.searchResults = []   ;
    vm.searchObj = term => { return { Year: term }; };

    vm.currentPeriod = {};

    vm.periods = [];
    vm.tableSchema = require('../../../table-schemas/periods-table-schema');

    vm.pageSize = 10;
    vm.get = periods.getWithPagination;
    vm.getAll = periods.get;
    vm.hideLoadBtn = () => vm.periods.length !== vm.searchResults.length;

    vm.goToNewPeriod = () => { TbUtils.go('main.new-period'); };

    vm.loading = true;
    vm.gettingCurrentPeriod = true;

    TbUtils.getAndLoad(periods.getWithPagination, vm.periods, () => { vm.loading = false; }, 0, vm.pageSize);

    periods.getCurrentPeriod(resp => { vm.currentPeriod = resp.data; },
                             resp => { TbUtils.showErrorMessage(resp.data); },
                             ()   => { vm.gettingCurrentPeriod = false; });

    vm.setCurrentPeriod = period => {
        TbUtils.confirm('Cambiar Periodo Actual', 'Esta seguro de escoger este periodo como periodo actual?',
            result => { 
                if (result) {
                    vm.loading = true;
                    periods.setCurrentPeriod(period.Id, 
                    resp => { TbUtils.reload(); },
                    resp => { TbUtils.showErrorMessage(resp.data); },
                    () => { vm.loading = false; });
                }  
            });
    };

}

module.exports = { name: 'PeriodsController', ctrl: PeriodsController };