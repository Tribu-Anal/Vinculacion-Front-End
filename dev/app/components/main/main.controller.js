(function(){
	"use strict";

	angular
		.module('VinculacionApp')
		.controller('MainController', MainController);

	MainController.$inject = [ '$scope' ];

	function MainController ($scope) {
		var vm = this;

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
	}
})();