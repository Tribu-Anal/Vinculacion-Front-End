SettlementController.$inject = [ 'TbUtils', 'settlement' ];

function SettlementController(TbUtils, settlement) {
    const vm = this;

    vm.searchResults = [];
    vm.searchObj = term => { return { AccountId: term }; };

    vm.tableData = [];
    vm.tableSchema = require('../../../table-schemas/settlement-table-schema')(downloadSettlement);

    vm.settlementLoading = true;

    TbUtils.getAndLoad(settlement.getPendingFiniquitos, vm.tableData, () => { vm.settlementLoading = false; });

    function downloadSettlement (student) {
        TbUtils.confirm('Descargar Finiquito', 
            'Una vez lo descargue, no podra volver a hacerlo. Continuar?', result => {
            if (result) {
                window.open(settlement.dowloadFiniquitoReport(student.AccountId));
                TbUtils.reload();
            }
        });
    }

}

module.exports = {
    name: 'SettlementController',
    ctrl: SettlementController
};