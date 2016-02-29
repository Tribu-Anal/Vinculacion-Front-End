angular.module('VinculacionApp')

	.factory('ResourceLoader', [ '$rootScope', function($rootScope) {
		var o = {
			swapResources: function(links) {
				$rootScope.links = links;
			}
		};

		return o;
	}]);