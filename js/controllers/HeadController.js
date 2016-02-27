angular.module('VinculacionApp')

	.controller('HeadCtrl', [ '$rootScope', function($rootScope){
		$rootScope.activeStyles = [
			"https://fonts.googleapis.com/css?family=Roboto:400,300,700",
			"css/registro.css"
		];
	}]);