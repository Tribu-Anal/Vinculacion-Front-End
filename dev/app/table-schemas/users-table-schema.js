module.exports = userType => {
	let schema = {
		headers: [ 'Numero de Cuenta', 'Nombre', 'Correo', 'Campus', 'Activado' ],
		rows: [
			{ type: 'label', props: { text: obj => obj.AccountId }  },
			{ type: 'label', props: { text: obj => obj.Name }  },
			{ type: 'label', props: { text: obj => obj.Email ? obj.Email : 'N/A' }  },
			{ type: 'label', props: { text: obj => obj.Campus } },
			{ type: 'icon',  props: { iconClass: obj => obj.Status.Active ? 
				'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove',  fontSize: 24 } }
		]
	};
	
	if (userType === 'student') {
		schema.headers.splice(3, 0, 'Carrera');
		schema.headers.splice(5, 0, 'Finiquiteado');

		schema.rows.splice(3, 0, 
			{ type: 'label', props: { text: obj => obj.Major ? obj.Major.Name : 'N/A' }  });

		schema.rows.splice(5, 0, 
			{ type: 'icon',  props: { iconClass: obj => obj.Finiquiteado ? 
				'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove',  fontSize: 24 } });
	}

	return schema;
};
