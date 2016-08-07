SettlementController.$inject = ['TbUtils', 'settlement', 'tableContent'];

function SettlementController(TbUtils, settlement, tableContent) {
    const vm = this;
    vm.settlementLoading = true;
    vm.settlementTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre', 'Carrera', 'Descargar Finiquito']);
    vm.downloadButton = {
        icon: 'glyphicon-save-file',
        onClick: downloadSettlement,
        tooltip: 'Descargar Finiquito'
    }

    settlement.getPendingFiniquitos(getPendingFiniquitosSuccess, getPendingFiniquitosFail);

    function getPendingFiniquitosSuccess(response) {
        if (response.data.length <= 0) {
            vm.settlementLoading = false;
            return;
        }
        for (let i = 0; i < response.data.length; i++) {
            let student = response.data[i];
            let newTableElement = {
                content: [
                    tableContent.createALableElement(student.AccountId),
                    tableContent.createALableElement(student.Name),
                    tableContent.createALableElement(getMajorName(student.Major)),
                    tableContent.createAButtonElement(vm.downloadButton)
                ],
                data: student
            }
            vm.settlementTable.body.push(newTableElement);
        }

        vm.settlementLoading = false;
    }

    function getPendingFiniquitosFail() {
        vm.settlementLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente');
    }

    function downloadSettlement(studentData) {
        window.open(settlement.dowloadFiniquitoReport(studentData.data.AccountId));
    }

    function getMajorName(major) {
        return major.Name ? major.Name : "N/A";
    }
}

module.exports = {name: 'SettlementController', ctrl: SettlementController};