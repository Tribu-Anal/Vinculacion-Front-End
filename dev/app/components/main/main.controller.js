MainController.$inject = [ '$rootScope', '$state', 'TbUtils'];

function MainController ($rootScope, $state, TbUtils) {
	var vm = this;

	vm.expand = false;
	vm.navItems = 
	[ 
	  { title: "PROYECTOS", ref: "main.projects", 
	  	icon: "glyphicon glyphicon-th-large", 
	  	active: $state.current.url.includes('/proyectos'),
	  	show: $state.current.url !== '/registro-maestro/{accountId}',
	  	clicked:TbUtils.preventGeneralLoading },

	  	{ title: "REPORTES", ref: "main.reports", 
	  	icon: "glyphicon glyphicon-folder-open", 
	  	active: $state.current.url.includes('/reportes'),
	  	show: $rootScope.Role === 'Admin' && $state.current.url !== '/registro-maestro/{accountId}',
		clicked: TbUtils.preventGeneralLoading },

	  { title: "SECCIONES", ref: "main.sections", 
	  	icon: "glyphicon glyphicon-th-list", 
	  	active: $state.current.url.includes('/secciones'),
	  	show: $state.current.url !== '/registro-maestro/{accountId}' && $rootScope.Role === 'Admin' || $rootScope.Role === 'Professor',
	  	clicked: TbUtils.preventGeneralLoading },
        
	  { title: "NUEVO PROFESOR", ref: "main.newprofessor", 
	  	icon: "glyphicon glyphicon-pencil", 
	  	active: $state.current.url.includes('/nuevo-profesor'),
	  	show: $rootScope.Role === 'Admin' && $state.current.url !== '/registro-maestro/{accountId}',
	  	clicked: TbUtils.preventGeneralLoading },

	  { title: "LOG OUT", ref: "landing.login", 
	  	icon: "glyphicon glyphicon-log-out", active: false,
	  	show: $state.current.url !== '/registro-maestro/{accountId}',
	  	clicked: closeSession }
	];

	$rootScope.$on('$stateChangeStart', changeActiveItem);

	function closeSession () {
		window.localStorage['Session'] = "";
	}

	function changeActiveItem (event, toState) {
		vm.navItems[0].active = toState.url.includes('/proyectos');
		vm.navItems[1].active = toState.url.includes('/reportes');
		vm.navItems[2].active = toState.url.includes('/secciones');
        vm.navItems[3].active = toState.url.includes('/nuevo-profesor');
	}
}

module.exports = { name: 'MainController', ctrl: MainController };