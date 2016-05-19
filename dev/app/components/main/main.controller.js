(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('MainController', MainController);

	MainController.$inject = [ '$rootScope', '$state', 'TbUtils'];

	function MainController ($rootScope, $state, TbUtils) {
		var vm = this;

		vm.expand = false;
		vm.navItems = 
		[ 
		  { title: "HOME", ref: "dashboard.home", 
		  	icon: "glyphicon glyphicon-home", 
		  	active: $state.current.url === '/home',
		  	show: true,
		  	clicked: TbUtils.preventGeneralLoading },

		  { title: "PROYECTOS", ref: "dashboard.projects", 
		  	icon: "glyphicon glyphicon-th-large", 
		  	active: $state.current.url.includes('/proyectos'),
		  	show: true,
		  	clicked:TbUtils.preventGeneralLoading },

		  { title: "SOLICITUDES", ref: "dashboard.requests", 
		  	icon: "glyphicon glyphicon-th-list", 
		  	active: $state.current.url === '/solicitudes',
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading },

		  { title: "SECCIONES", ref: "dashboard.newsection", 
		  	icon: "glyphicon glyphicon-plus", 
		  	active: $state.current.url === '/nueva-seccion',
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading },

		  { title: "LOG OUT", ref: "landing", 
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
			vm.navItems[2].active = toState.url === '/solicitudes';
			vm.navItems[3].active = toState.url === '/nueva-seccion';
		}
	}
})();