angular.module('VinculacionApp')

	.controller('NavCtrl', [ function() {
		this.navItems = [ 
						  { title: "HOME", ref: "home", icon: "", active: true },
						  { title: "PROYECTOS", ref: "home.proyectos", icon: "", active: false },
						  { title: "SOLICITUDES", ref: "home.solicitudes", icon: "", active: false },
						  { title: "LOG OUT", ref: "landing", icon: "", active: false }
						];
		this.showSideMenu = false;
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