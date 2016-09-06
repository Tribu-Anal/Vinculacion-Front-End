NewPeriodController.$inject = [ 'TbUtils', 'periods' ];

function NewPeriodController (TbUtils, periods) {
	const vm = this;

	const today = new Date();

	vm.period = {
		Number: 0,
		Year: 0,
		FromDate: today,
		ToDate: today
	};

	vm.back = () => { TbUtils.go('main.periods'); }

	vm.formTitle = 'Crear Periodo';
	vm.submitting = false;
	vm.submit = submit;

	function submit() {
		vm.submitting = true;

		vm.period.Number = Math.floor(vm.period.FromDate.getMonth()/4)+1;
		vm.period.Year = vm.period.FromDate.getFullYear();
		vm.period.FromDate = getDate(vm.period.FromDate);
		vm.period.ToDate = getDate(vm.period.ToDate);
		
		TbUtils.postAndGoTo(periods.post, vm.period, 
			'main.periods', 'El periodo se creo con exito!', () => { vm.submitting = false; });
	}

	function getDate (date) {
		return date.getDate() + '-' +  (date.getMonth()+1) + '-' + date.getFullYear();
	}

}

module.exports = { name: 'NewPeriodController', ctrl: NewPeriodController };