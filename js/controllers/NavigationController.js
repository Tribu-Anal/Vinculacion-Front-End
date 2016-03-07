angular.module('VinculacionApp')

	.controller('NavCtrl', [ function() {
		var ctrl = this;
		ctrl.navItems = [ 
						  { title: "HOME", ref: "home", icon: 
						  "glyphicon glyphicon-home", active: true },

						  { title: "PROYECTOS", ref: "home.proyectos", 
						  icon: "glyphicon glyphicon-folder-open", active: false },

						  { title: "SOLICITUDES", ref: "home.solicitudes", 
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

		ctrl.recentProjects = [];

		function getRecentProyects(){
			ctrl.recentProjects.push({
				name: 'Proyecto de Reforestacion',
				image: '../assets/reforestacion.jpg',
				coment: 'Cupcake ipsum dolor sit amet. Carrot cake gummies sweet roll topping. Tiramisu sugar plum sesame snaps wafer oat cake pastry pudding candy. Candy cupcake dragée soufflé macaroon tiramisu. Tiramisu soufflé gummies wafer soufflé. Sweet tootsie roll cookie gummi bears. Sweet roll croissant sesame snaps croissant cake apple pie marzipan marshmallow macaroon.'
			});
		};

		getRecentProyects();
	}]);