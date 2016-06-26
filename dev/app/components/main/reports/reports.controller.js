(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('ReportsController', ReportsController);

	ReportsController.$inject = [ '$rootScope', 'TbUtils' ];

	function ReportsController ($rootScope, TbUtils) {
		var vm = this;
	}

})();