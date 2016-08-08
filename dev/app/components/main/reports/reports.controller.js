ReportsController.$inject = [ '$rootScope', 'TbUtils', 'reports', '$state', '$mdDialog' ];

function ReportsController ($rootScope, TbUtils, reports, $state, $mdDialog) {
	if ($rootScope.Role !== 'Admin') $state.go('main.dashboard');

	var vm = this;

	vm.reports = require('./reports');
    vm.selectedReport = 0;
    vm.acceptClicked = acceptClicked;

    function acceptClicked (ev) {
    	const report = vm.reports[vm.selectedReport];

    	if (report.hasParam) 
    		showParamPrompt (ev, report);
    	else
    		generateReport('');
    }

    function showParamPrompt  (ev, report) {
	    const confirm = $mdDialog.prompt()
	      .title(report.paramName)
	      .placeholder(report.placeholder)
	      .targetEvent(ev)
	      .ok('Aceptar')
	      .cancel('Cancelar');
	    $mdDialog.show(confirm).then( result => {
	      if (result) generateReport(result);
	    });
	  }

	function generateReport (param) {            
        window.open(vm.reports[vm.selectedReport].url+param);
	}

}

module.exports = { name: 'ReportsController', ctrl: ReportsController };
