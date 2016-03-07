angular.module('VinculacionApp')

	.controller('HomeCtrl', [ function() {
		var ctrl = this;
		
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