describe('MainController', function () {

	var $rootScope,
		$scope,
		controller;

	beforeEach( function () {
		module('VinculacionApp');

		inject( function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')
						('MainController', { $scope: $scope });
		});

	});

	describe('Init', function () {
		it ('Should instantiate expand to false', function () {
			//expect(controller.projects.length).toEqual(0);
		});
		// it ('Should instantiate navItems to 4 element array', function () {
		// 	expect(controller.navItems.length).toEqual(4);
		// });
	});

});