(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('MainController', MainController);

	MainController.$inject = [ '$rootScope', '$state', 'TbUtils' ];

	function MainController ($rootScope, $state, TbUtils) {
		var vm = this;

		vm.expand = false;
		vm.navItems = 
		[ 
		  { title: "HOME", ref: "dashboard.home", 
		  	icon: "glyphicon glyphicon-home", 
		  	active: $state.current.url === '/home',
		  	clicked: TbUtils.preventGeneralLoading },

		  { title: "PROYECTOS", ref: "dashboard.projects", 
		  	icon: "glyphicon glyphicon-folder-open", 
		  	active: $state.current.url.includes('/proyectos'),
		  	clicked:TbUtils.preventGeneralLoading },

		  { title: "SOLICITUDES", ref: "dashboard.requests", 
		  	icon: "glyphicon glyphicon-tasks", 
		  	active: $state.current.url === '/solicitudes',
		  	clicked: TbUtils.preventGeneralLoading },

		  { title: "LOG OUT", ref: "landing", 
		  	icon: "glyphicon glyphicon-log-out", active: false,
		  	clicked: function () {} }
		];

		$rootScope.$on('$stateChangeStart', changeActiveItem);

		function changeActiveItem (event, toState) {
			vm.navItems[0].active = toState.url === '/home';
			vm.navItems[1].active = toState.url.includes('/proyectos');
			vm.navItems[2].active = toState.url === '/solicitudes';
		}

	}
})();