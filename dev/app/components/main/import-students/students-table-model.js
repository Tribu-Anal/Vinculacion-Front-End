module.exports = {
	headers: [ 'Numero de Cuenta', 'Nombre', 'Correo', 'Carrera', 'Existe' ],
	schema: [
		{ type: 'label', props: { text: obj => obj.AccountId }  },
		{ type: 'label', props: { text: obj => obj.Name }  },
		{ type: 'label', props: { text: obj => obj.Email }  },
		{ type: 'label', props: { text: obj => obj.Major }  },
		{ type: 'icon',  props: { iconClass: obj => obj.Exists ?  'glyphicon glyphicon-ok' : 
		'glyphicon glyphicon-remove', fontSize: 24  } }
	],
	data: {}
};