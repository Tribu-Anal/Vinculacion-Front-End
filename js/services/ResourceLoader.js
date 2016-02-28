angular.module('VinculacionApp')

	.factory('ResourceLoader', [ '$rootScope', function($rootScope) {
		var o = {
			swapResources: function(links, scripts) {
				$rootScope.links = links;
				$rootScope.scripts = scripts;
			}
		};

		return o;
	}]);