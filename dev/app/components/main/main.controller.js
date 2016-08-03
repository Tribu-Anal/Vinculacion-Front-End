MainController.$inject = [ '$rootScope', '$state', 'TbUtils'];

function MainController ($rootScope, $state, TbUtils) {
	var vm = this;

	vm.expand = false;
	vm.navItems = require('./main-nav-items')($rootScope, $state, TbUtils);
}

module.exports = { name: 'MainController', ctrl: MainController };