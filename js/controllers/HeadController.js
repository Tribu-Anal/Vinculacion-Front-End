angular.module('VinculacionApp')

	.controller('HeadCtrl', [ '$rootScope', function($rootScope){
		$rootScope.styles = [
			"css/registro.css"
		];

		$rootScope.activeStyles = [
			"css/registro.css"
		];
	}]);