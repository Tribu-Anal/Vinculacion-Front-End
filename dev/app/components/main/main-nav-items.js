module.exports = ($rootScope, $state, TbUtils) => {
	return [
		{
			title: "INICIO", ref: 'main.'+$rootScope.Role.toLowerCase()+'-dashboard', url: '/inicio-'+$rootScope.Role.toLowerCase(),
			icon: "glyphicon glyphicon-home",
			active: $state.current.url.includes('/inicio-'+$rootScope.Role.toLowerCase()),
			show: $state.current.url !== '/registro-maestro/{accountId}',
			clicked:TbUtils.preventGeneralLoading
		},
		{
			title: "PROYECTOS", ref: "main.projects", url: '/proyectos',
	  		icon: "glyphicon glyphicon-th-large",
	  		active: $state.current.url.includes('/proyectos'),
	  		show: $state.current.url !== '/registro-maestro/{accountId}' && $rootScope.Role !== 'Student',
	  		clicked:TbUtils.preventGeneralLoading
	 	},

	  	{
	  		title: "SECCIONES", ref: "main.sections", url: '/secciones',
		  	icon: "glyphicon glyphicon-th-list",
		  	active: $state.current.url.includes('/secciones'),
		  	show: $state.current.url !== '/registro-maestro/{accountId}'
		  	      && ($rootScope.Role === 'Admin' || $rootScope.Role === 'Professor'),
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
	  		title: "REPORTES", ref: "main.reports", url: '/reportes',
	  		icon: "glyphicon glyphicon-folder-open",
		  	active: $state.current.url.includes('/reportes'),
		  	show: $rootScope.Role === 'Admin' && $state.current.url !== '/registro-maestro/{accountId}',
			clicked: TbUtils.preventGeneralLoading
		},

	  	{
		  	title: "FINIQUITOS", ref: "main.settlement", url: '/finiquitos',
		  	icon: "glyphicon glyphicon-list-alt",
		  	active: $state.current.url.includes('/finiquitos'),
		  	show: $state.current.url !== '/registro-maestro/{accountId}' && $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},
	  	
	  	{
		  	title: "APROBAR HORAS", ref: "main.approve-hours", url: '/aprobar-horas',
		  	icon: "glyphicon glyphicon-check",
		  	active: $state.current.url.includes('/aprobar-horas'),
		  	show: $state.current.url !== '/registro-maestro/{accountId}' && $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
	  		title: "LOG OUT", ref: "landing.login",
	  		icon: "glyphicon glyphicon-log-out", active: false,
		  	show: $state.current.url !== '/registro-maestro/{accountId}',
		  	clicked: () => {
		  		$rootScope.Session = window.localStorage['Session'] = "";
		  		$rootScope.loggedIn = false;
		  	}
	  	}
	];
};
