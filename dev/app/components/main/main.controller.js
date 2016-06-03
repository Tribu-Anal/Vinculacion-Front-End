"use strict";

MainController.$inject = [ '$rootScope', '$state', 'TbUtils'];

function MainController ($rootScope, $state, TbUtils) {
	var vm = this;

	vm.expand = false;
	vm.navItems = 
	[ 
	  { title: "HOME", ref: "main.home", 
	  	icon: "glyphicon glyphicon-home", 
	  	active: $state.current.url === '/home',
	  	show: true,
	  	clicked: TbUtils.preventGeneralLoading },

	  { title: "PROYECTOS", ref: "main.projects", 
	  	icon: "glyphicon glyphicon-th-large", 
	  	active: $state.current.url.includes('/proyectos'),
	  	show: true,
	  	clicked:TbUtils.preventGeneralLoading },

	  { title: "LOG OUT", ref: "landing.login", 
	  	icon: "glyphicon glyphicon-log-out", active: false,
	  	show: true,
	  	clicked: closeSession }
	];

	$rootScope.$on('$stateChangeStart', changeActiveItem);

	function closeSession () {
		window.localStorage['Session'] = "";
	}

	function changeActiveItem (event, toState) {
		vm.navItems[0].active = toState.url === '/home';
		vm.navItems[1].active = toState.url.includes('/proyectos');
	}
}

module.exports = MainController;