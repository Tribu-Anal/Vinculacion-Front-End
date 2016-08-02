TbSidebarController.$inject = [ '$rootScope', '$scope' ];

function TbSidebarController ($rootScope, $scope) {
	var vm = this;
	var activeItem = {};

	vm.navItemClicked = navItemClicked;

	function init () {
		for (let i = 0; i < $scope.navItems.length; i++) {
			let navItem = $scope.navItems[i];

			if (navItem.active) {
				activeItem = navItem;
				return;
			}
			
		}
	}

	function navItemClicked(itemIndex, clicked) {
		activeItem.active = false;
		setActiveItem(itemIndex);
		clicked();
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

	$rootScope.$on('$stateChangeStart', changeActiveItem);

	function changeActiveItem (event, toState) {
		for (let i = 0; i < $scope.navItems.length; i++) {
			const item = $scope.navItems[i];
			item.active = item.url && toState.url.includes(item.url);
		}
	}

	init();
}

module.exports = { name: 'TbSidebarController', ctrl: TbSidebarController };