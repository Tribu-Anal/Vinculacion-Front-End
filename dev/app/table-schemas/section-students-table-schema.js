module.exports = btnClick => {
	const model = {
		headers: [ 'Numero de Cuenta', 'Nombre', '' ],
		rows: [
			{ type: 'label', props: { text: obj => obj.AccountId }  },
			{ type: 'label', props: { text: obj => obj.Name }  },
			{ type: 'button', props: { icon: 'glyphicon glyphicon-trash', 
			                           tooltip: 'Borrar Alumno', 
			                           onClick: btnClick } 
			}
		]
	};

	return model;
};
