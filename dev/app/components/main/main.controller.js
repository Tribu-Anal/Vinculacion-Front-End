MainController.$inject = [ '$rootScope', '$state', 'TbUtils'];

function MainController ($rootScope, $state, TbUtils) {
	var vm = this;

	vm.expand = false;
	vm.navItems = require('./main-nav-items')($rootScope, $state, TbUtils);

	$rootScope.$on('$stateChangeStart', stateChangeStart);

	function stateChangeStart (event, toState) {
		for (let i = 0; i < vm.navItems.length; i++) {
			const navItem = vm.navItems[i];
			navItem.active = toState.url.includes(navItem.url);
		}
	}

}

module.exports = { name: 'MainController', ctrl: MainController };