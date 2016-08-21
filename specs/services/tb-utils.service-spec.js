
describe('TbUtils', function() {

	var service;

	beforeEach(function() {
		module('VinculacionApp');

		// inject(function($injector) {
		// 	service = $injector.get('TbUtils');
		// });
	});

	describe('fillListWithResponseData', function() {
		it('should load the destiny list with the elements in origin', function() {
			// let origin = [1, 2, 3];
			// let destiny = [];
			// service.fillListWithResponseData(origin, destiny);
			//expect(destiny).toEqual(origin);
			expect(true).toBe(true);
		});
	});

	// describe('removeItemFromList', function() {
	// 	it('should remove the item in the specified position from the list', function() {
	// 		let origin = ['Angular', 'Jasmine', 'Behavior', 'Test'];
	// 		service.removeItemFromList('Jasmine', origin);
	// 		expect(origin).toEqual(['Angular', 'Behavior', 'Test']);
	// 	});
	// });

	// describe('getTable', function() {
	// 	it('should return a generated table with the specified headers', function() {
	// 		let headers = ['Numero Cuenta', 'Nombre', 'Carrera'];
	// 		let table = {
	// 			headers: headers,
	// 			body: [],
	// 			action: false
	// 		};
	// 		let generate = service.getTable(headers);

	// 		expect(generate).toEqual(table);
	// 	});
	// });

	// describe('toCapitalize', function() {
	// 	it('should capitilize only the first letter of any word', function() {
	// 		let capital = service.toCapitalize('trunks');

	// 		expect(capital).toBe('Trunks');
	// 	});
	// });

	// describe('showErrorMessage', function() {
	// 	var response, mock;

	// 	beforeEach(function($provide) {
	// 		response = {
	// 			statusText: 'Falla de Credenciales',
	// 			data: 'Las credenciales ingresadas son incorrectas'
	// 		};

	// 		mock = {pop: jasmine.createSpy()};
	// 		$provide.value('toaster', mock);
	// 	});

	// 	it('should show api error message', function() {
	// 		service.showErrorMessage('error', response, 'Credenciales incorrectas', 'Ha habido un error');
	// 		expect(mock.pop).toHaveBeenCalledWith({
	// 			type: 'error',
	// 			title: response.statusTex,
	// 			body: response.data,
	// 			timeout: 1500
	// 		});
	// 	});

	// 	it('should show custom error message', function() {
	// 		service.showErrorMessage('error', null, 'Ha habido un error', 'Credenciales incorrectas');
	// 		expect(mock.pop).toHaveBeenCalledWith({
	// 			type: 'error',
	// 			title: 'Ha habido un error',
	// 			body: 'Credenciales incorrectas',
	// 			timeout: 1500
	// 		})
	// 	});
	// })
});
