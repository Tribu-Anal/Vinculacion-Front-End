angular.module('VinculacionApp')

	.controller('NavCtrl', [ function() {
		this.navItems = [ 
						  { title: "HOME", ref: "home", active: true },
						  { title: "PROYECTOS", ref: "home.proyectos", active: false },
						  { title: "SOLICITUDES", ref: "home.solicitudes", active: false },
						  { title: "LOG OUT", ref: "landing", active: false }
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