config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('landing', {
			templateUrl: "templates/components/landing/landing.html"
		});
}

module.exports = config;