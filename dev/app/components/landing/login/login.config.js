config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('landing.login', {
			url: '/',
			templateUrl: "templates/components/landing/login/login.html",
			controller: 'LoginController as vm',
			onEnter: onStateEnter
		});
}

let onStateEnter = [ '$rootScope', 
	function (rootScope) { 
		rootScope.viewTitle  = "Vinculacion | Bienvenido";
    	rootScope.viewStyles = "landing login";
    }
];

module.exports = config;