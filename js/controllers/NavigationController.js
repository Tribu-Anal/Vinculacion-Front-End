angular.module('VinculacionApp')

	.controller('NavCtrl', [ function() {
		this.navItems = [ 
						  { title: "HOME", ref: "home", icon: 
						  "glyphicon glyphicon-home", active: true },

						  { title: "PROYECTOS", ref: "home.proyectos", 
						  icon: "glyphicon glyphicon-folder-open", active: false },

						  { title: "SOLICITUDES", ref: "home.solicitudes", 
						  	icon: "glyphicon glyphicon-tasks", active: false },

						  { title: "LOG OUT", ref: "landing", 
						  icon: "glyphicon glyphicon-log-out", active: false }
						];

		this.showSideBar = true;
		var activeItem = this.navItems[0];

		this.navItemClicked = function(itemIndex) {
			activeItem.active = false;
			this.setActiveItem(itemIndex);
		};

		this.setActiveItem = function(itemIndex) {
			activeItem = this.navItems[itemIndex];
			activeItem.active = true;
		};

	}]);