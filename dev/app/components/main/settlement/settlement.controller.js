SettlementController.$inject = ['TbUtils', 'settlement',
    'tableContent', '$scope', 'filterFilter'
];

function SettlementController(TbUtils, settlement,
    tableContent, $scope, filterFilter) {
    const vm = this;
    vm.settlementLoading = true;
    vm.settlementTable = TbUtils.getTable(['Numero de Cuenta', 'Nombre', 'Carrera', 'Descargar Finiquito']);
    vm.downloadButton = {
        icon: 'glyphicon-save-file',
        onClick: downloadSettlement,
        tooltip: 'Descargar Finiquito'
    }

    vm.settlementTableData = [];
    vm.limitInLettersToSearch = 3;

    settlement.getPendingFiniquitos(getPendingFiniquitosSuccess, getPendingFiniquitosFail);

    function getPendingFiniquitosSuccess(response) {
        if (response.data.length <= 0) {
            vm.settlementLoading = false;
            return;
        }
        vm.settlementTableData = response.data;
        constructTableBody(vm.settlementTableData);
        vm.settlementLoading = false;
    }

    function constructTableBody(data){
        let table = [];
        vm.settlementLoading = true;
        for (let i = 0; i < data.length; i++) {
            let student = data[i];
            let newTableElement = {
                content: [
                    tableContent.createALableElement(student.AccountId),
                    tableContent.createALableElement(student.Name),
                    tableContent.createALableElement(getMajorName(student.Major)),
                    tableContent.createAButtonElement(vm.downloadButton)
                ],
                data: student
            }
            table.push(newTableElement);
        }
        vm.settlementTable.body = table;
        vm.settlementLoading = false;
    }

    function getPendingFiniquitosFail() {
        vm.settlementLoading = false;
        TbUtils.displayNotification('error', 'Error',
            'No se pudieron cargar los alumnos correctamente');
    }

    function downloadSettlement(studentData) {
        window.open(settlement.dowloadFiniquitoReport(studentData.data.AccountId));
        location.reload();
    }

    function getMajorName(major) {
        return major.Name ? major.Name : "N/A";
    }

    $scope.$watch('search.data', function(term) {
        let obj = {
            AccountId: term
        };
        if (term && term.length >= vm.limitInLettersToSearch) {
            let filterStudents = {
                data: filterFilter(vm.settlementTableData, obj)
            };
            constructTableBody(filterStudents.data);
        } else {
            constructTableBody(vm.settlementTableData);
        }
    });
}

module.exports = {
    name: 'SettlementController',
    ctrl: SettlementController
};