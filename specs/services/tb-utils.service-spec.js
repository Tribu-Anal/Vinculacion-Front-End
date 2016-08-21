
describe('TbUtils', function() {

	var service;

	beforeEach(function() {
		module('VinculacionApp');
	});

	describe('fillListWithResponseData', function() {
		it('should load the destiny list with the elements in origin', inject(function(TbUtils) {
			let origin = [1, 2, 3];
			let destiny = [];
			TbUtils.fillListWithResponseData(origin, destiny);
			expect(destiny).toEqual(origin);
		}));
	});

	describe('removeItemFromList', function() {
		it('should remove the item in the specified position from the list', inject(function(TbUtils) {
			let origin = ['Angular', 'Jasmine', 'Behavior', 'Test'];
			TbUtils.removeItemFromList('Jasmine', origin);
			expect(origin).toEqual(['Angular', 'Behavior', 'Test']);
		}));
	});

	describe('getTable', function() {
		it('should return a generated table with the specified headers', inject(function(TbUtils) {
			let headers = ['Numero Cuenta', 'Nombre', 'Carrera'];
			let table = {
				headers: headers,
				body: [],
				actions: false
			};
			let generate = TbUtils.getTable(headers);

			expect(generate).toEqual(table);
		}));
	});

	describe('toTitleCase', function() {
		it('should capitilize only the first letter of any word', inject(function(TbUtils) {
			let capital = TbUtils.toTitleCase('trunks');

			expect(capital).toBe('Trunks');
		}));
	});

	describe('showErrorMessage', function() {
		var response, mock;

		beforeEach(function() {
			response = {
				statusText: 'Falla de Credenciales',
				data: 'Las credenciales ingresadas son incorrectas'
			};

			mock = {pop: jasmine.createSpy()};
			
			module(function($provide) {
				$provide.value('toaster', mock);
			});
		});

		it('should show api error message', inject(function(TbUtils) {
			TbUtils.showErrorMessage('error', response, 'Credenciales incorrectas', 'Ha habido un error');
			expect(mock.pop).toHaveBeenCalledWith({
				type: 'error',
				title: response.statusText,
				body: response.data,
				timeout: 1500
			});
		}));

		it('should show custom error message', inject(function(TbUtils) {
			TbUtils.showErrorMessage('error', null, 'Credenciales incorrectas', 'Ha habido un error');
			expect(mock.pop).toHaveBeenCalledWith({
				type: 'error',
				title: 'Ha habido un error',
				body: 'Credenciales incorrectas',
				timeout: 1500
			})
		}));
	})
});
