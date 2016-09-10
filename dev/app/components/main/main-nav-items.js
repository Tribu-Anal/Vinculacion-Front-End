module.exports = ($rootScope, $state, TbUtils) => {
	return [
		{
			title: "INICIO", ref: 'main.'+$rootScope.Role.toLowerCase()+'-dashboard', url: '/inicio',
			icon: "glyphicon glyphicon-home",
			active: $state.current.url.includes('/inicio'),
			show: true,
			clicked:TbUtils.preventGeneralLoading
		},
		
		{
			title: "PROYECTOS", ref: "main.projects", url: '/proyectos',
	  		icon: "glyphicon glyphicon-th-large",
	  		active: $state.current.url.includes('/proyectos'),
	  		show: $rootScope.Role !== 'Student',
	  		clicked:TbUtils.preventGeneralLoading
	 	},

	  	{
	  		title: "SECCIONES", ref: "main.sections", url: '/secciones',
		  	icon: "glyphicon glyphicon-th-list",
		  	active: $state.current.url.includes('/secciones'),
		  	show: $rootScope.Role === 'Admin' || $rootScope.Role === 'Professor',
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
		  	title: "CLASES", ref: "main.classes", url: '/clases',
		  	icon: "glyphicon glyphicon-book",
		  	active: $state.current.url.includes('/clases'),
		  	show: $rootScope.Role === 'Admin',
			clicked: TbUtils.preventGeneralLoading
		},

	  	{
		  	title: "FINIQUITOS", ref: "main.settlement", url: '/finiquitos',
		  	icon: "glyphicon glyphicon-list-alt",
		  	active: $state.current.url.includes('/finiquitos'),
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
		  	title: "PERIODOS", ref: "main.periods", url: '/periodos',
		  	icon: "glyphicon glyphicon-tasks",
		  	active: $state.current.url.includes('/periodos'),
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
		  	title: "PROFESORES", ref: "main.professors", url: '/profesores',
		  	icon: "glyphicon glyphicon-user",
		  	active: $state.current.url.includes('/profesores'),
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
		  	title: "ALUMNOS", ref: "main.students", url: '/alumnos',
		  	icon: "glyphicon glyphicon-education",
		  	active: $state.current.url.includes('/alumnos'),
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},
	  	
	  	{
		  	title: "APROBAR HORAS", ref: "main.approve-hours", url: '/aprobar-horas',
		  	icon: "glyphicon glyphicon-check",
		  	active: $state.current.url.includes('/aprobar-horas'),
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading
	  	},

	  	{
		  	title: "REPORTES", ref: "main.reports", url: '/reportes',
		  	icon: "glyphicon glyphicon-folder-open",
		  	active: $state.current.url.includes('/reportes'),
		  	show: $rootScope.Role === 'Admin',
			clicked: TbUtils.preventGeneralLoading
		},

	  	{
	  		title: "SALIR", ref: "landing.login",
	  		icon: "glyphicon glyphicon-log-out", active: false,
		  	show: true,
		  	clicked: () => {
		  		$rootScope.Session = window.localStorage['Session'] = "";
		  		$rootScope.loggedIn = false;
		  	}
	  	}
	];
};
