module.exports = {
	headers: [ 'Numero de Cuenta', 'Nombre', 'Correo', 'Carrera', 'Existe' ],
	rows: [
		{ type: 'label', props: { text: obj => obj.Cuenta }  },
		{ type: 'label', props: { text: obj => obj.Nombre }  },
		{ type: 'label', props: { text: obj => obj.Correo }  },
		{ type: 'label', props: { text: obj => obj.Carrera }  },
		{ type: 'icon',  props: { iconClass: obj => obj.Estado ?  'glyphicon glyphicon-ok' : 
		'glyphicon glyphicon-remove', fontSize: 24  } }
	]
};
