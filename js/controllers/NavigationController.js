angular.module('VinculacionApp')

	.controller('NavCtrl', [ function() {
		this.navItems = [ 
						  { title: "Home", ref: "home", active: true },
						  { title: "Proyectos", ref: "home.proyectos", active: false },
						  { title: "Solicitudes", ref: "home.solicitudes", active: false },
						  { title: "Log Out", ref: "landing", active: false }
						];
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