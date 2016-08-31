SettlementController.$inject = ['TbUtils', 'settlement', '$scope', 'filterFilter', '$rootScope' ];

function SettlementController(TbUtils, settlement, $scope, filterFilter, $rootScope) {
    
    const vm = this;
    vm.settlementLoading = true;
    vm.tableData = [];
    vm.tableDataTemp = [];
    vm.tableSchema = require('../../../table-schemas/settlement-table-schema')(downloadSettlement);
    vm.limitInLettersToSearch = 3;

    $scope.$watch('search.data', search);

    settlement.getPendingFiniquitos(getPendingFiniquitosSuccess, getPendingFiniquitosFail);

    function getPendingFiniquitosSuccess(response) {
        vm.tableData = vm.tableDataTemp = response.data;
        vm.settlementLoading = false;
    }

    function getPendingFiniquitosFail() {
        vm.settlementLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente');
    }

    function downloadSettlement (student) {
        TbUtils.confirm('Descargar Finiquito', 
            'Una vez lo descargue, no podra volver a hacerlo. Continuar?', result => {
            if (result) {
                window.open(settlement.dowloadFiniquitoReport(student.AccountId));
                location.reload();
            }
        });
    }

    function search (term) {
        let obj = {
            AccountId: term
        };

        if (term && term.length >= vm.limitInLettersToSearch)
            vm.tableData = filterFilter(vm.tableData, obj)
        else
            vm.tableData = vm.tableDataTemp;
    }

}

module.exports = {
    name: 'SettlementController',
    ctrl: SettlementController
};