module.exports = btnClick => {
	const model = {
		headers: [ 'Numero de Cuenta', 'Nombre', '' ],
		schema: [
			{ type: 'label', props: { text: obj => obj.AccountId }  },
			{ type: 'label', props: { text: obj => obj.Name }  },
			{ type: 'button', props: { icon: 'glyphicon glyphicon-trash', 
			                           tooltip: 'Borrar Alumno', 
			                           onClick: btnClick } 
			}
		],
		data: {}
	};

	return model;
};