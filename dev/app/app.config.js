config.$inject = [ '$urlRouterProvider', '$locationProvider' ];

function config (urlRouterProvider, locationProvider) {
	urlRouterProvider.otherwise('/');

	locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}

module.exports = config;