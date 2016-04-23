(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('TbSidebarController', TbSidebarController);

	TbSidebarController.$inject = [ '$scope' ];

	function TbSidebarController ($scope) {
		var vm = this;
		var activeItem = {};

		vm.navItemClicked = navItemClicked;

		function navItemClicked(itemIndex) {
			activeItem.active = false;
			setActiveItem(itemIndex);
		}

		function setActiveItem(itemIndex) {
			if (noList()) return;

			activeItem = $scope.navItems[itemIndex];
			activeItem.active = true;
		}

		function noList () {
			return $scope.navItems === undefined || 
				   $scope.navItems.length === 0;
		}

		setActiveItem(0);
	}
})();