(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('TbCache', TbCache);
    
    TbCache.$inject = ['$cacheFactory'];

	function TbCache ($cacheFactory) {        
        
        return $cacheFactory('TbData');

	}
})();