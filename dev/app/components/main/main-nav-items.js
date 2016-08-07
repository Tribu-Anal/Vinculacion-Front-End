function closeSession () {
	window.localStorage['Session'] = "";
}

module.exports = ($rootScope, $state, TbUtils) => {
	return [ 
		{ 
			title: "PROYECTOS", ref: "main.projects", url: '/proyectos',
	  		icon: "glyphicon glyphicon-th-large", 
	  		active: $state.current.url.includes('/proyectos'),
	  		show: $state.current.url !== '/registro-maestro/{accountId}',
	  		clicked:TbUtils.preventGeneralLoading 
	 	},

	  	{ 
	  		title: "REPORTES", ref: "main.reports", url: '/reportes',
	  		icon: "glyphicon glyphicon-folder-open", 
		  	active: $state.current.url.includes('/reportes'),
		  	show: $rootScope.Role === 'Admin' && $state.current.url !== '/registro-maestro/{accountId}',
			clicked: TbUtils.preventGeneralLoading 
		},

	  	{ 
	  		title: "SECCIONES", ref: "main.sections", url: '/secciones',
		  	icon: "glyphicon glyphicon-th-list", 
		  	active: $state.current.url.includes('/secciones'),
		  	show: $state.current.url !== '/registro-maestro/{accountId}' 
		  	      && $rootScope.Role === 'Admin' || $rootScope.Role === 'Professor',
		  	clicked: TbUtils.preventGeneralLoading 
	  	},
	    
	  	{ 
		  	title: "NUEVO PROFESOR", ref: "main.newprofessor", url: '/nuevo-profesor',
		  	icon: "glyphicon glyphicon-pencil", 
		  	active: $state.current.url.includes('/nuevo-profesor'),
		  	show: $rootScope.Role === 'Admin' && $state.current.url !== '/registro-maestro/{accountId}',
		  	clicked: TbUtils.preventGeneralLoading 
	  	},

	  	{ 
		  	title: "FINIQUITOS", ref: "main.settlement", url: '/finiquitos',
		  	icon: "glyphicon glyphicon-pencil", 
		  	active: $state.current.url.includes('/finiquitos'),
		  	show: $rootScope.Role === 'Admin',
		  	clicked: TbUtils.preventGeneralLoading 
	  	},

	  	{ 
	  		title: "LOG OUT", ref: "landing.login", 
	  		icon: "glyphicon glyphicon-log-out", active: false,
		  	show: $state.current.url !== '/registro-maestro/{accountId}',
		  	clicked: closeSession 
	  	}
	];
};