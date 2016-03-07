angular.module('VinculacionApp')

	.controller('NavCtrl', [ function() {
		var ctrl = this;
		ctrl.navItems = [ 
						  { title: "HOME", ref: "nav.home", icon: 
						  "glyphicon glyphicon-home", active: true },

						  { title: "PROYECTOS", ref: "nav.proyectos", 
						  icon: "glyphicon glyphicon-folder-open", active: false },

						  { title: "SOLICITUDES", ref: "nav.solicitudes", 
						  	icon: "glyphicon glyphicon-tasks", active: false },

						  { title: "LOG OUT", ref: "landing", 
						  icon: "glyphicon glyphicon-log-out", active: false }
						];

		ctrl.showSideBar = true;
		var activeItem = ctrl.navItems[0];

		ctrl.navItemClicked = function(itemIndex) {
			activeItem.active = false;
			ctrl.setActiveItem(itemIndex);
		};

		ctrl.setActiveItem = function(itemIndex) {
			activeItem = ctrl.navItems[itemIndex];
			activeItem.active = true;
		};
	}]);