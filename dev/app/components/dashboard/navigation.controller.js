(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('NavigationController', NavigationController);

	function NavigationController () {
		var vm = this;
		var activeItem = {};

		vm.showSideBar = true;
		vm.navItemClicked = navItemClicked;
		vm.setActiveItem = setActiveItem;
		vm.navItems = 
		[ 
		  { title: "HOME", ref: "dashboard.home", 
		  	icon: "glyphicon glyphicon-home", active: true },

		  { title: "PROYECTOS", ref: "dashboard.projects", 
		  	icon: "glyphicon glyphicon-folder-open", active: false },

		  { title: "SOLICITUDES", ref: "dashboard.requests", 
		  	icon: "glyphicon glyphicon-tasks", active: false },

		  { title: "LOG OUT", ref: "landing", 
		  	icon: "glyphicon glyphicon-log-out", active: false }
		];

		function navItemClicked(itemIndex) {
			activeItem.active = false;
			setActiveItem(itemIndex);
		}

		function setActiveItem(itemIndex) {
			activeItem = vm.navItems[itemIndex];
			activeItem.active = true;
		}

		setActiveItem(0);
	}
})();