NewPeriodController.$inject = [ 'TbUtils', 'periods' ];

function NewPeriodController (TbUtils, periods) {
	const vm = this;

	const today = new Date();

	vm.period = {
		Number: 1,
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

		vm.period.Year = vm.period.FromDate ? vm.period.FromDate.getFullYear() : today.getFullYear();
		vm.period.FromDate = vm.period.FromDate ? getDate(vm.period.FromDate) : getDate(today);
		vm.period.ToDate = vm.period.ToDate ? getDate(vm.period.ToDate) : getDate(today);
		
		TbUtils.postAndGoTo(periods.post, vm.period, 
			'main.periods', 'El periodo se creo con exito!', () => { vm.submitting = false; });
	}

	function getDate (date) {
		return date.getDate() + '-' +  (date.getMonth()+1) + '-' + date.getFullYear();
	}

}

module.exports = { name: 'NewPeriodController', ctrl: NewPeriodController };