module.exports = {
	headers: [ 'Numero de Cuenta', 'Nombre', 'Correo', 'Carrera' ],
	rows: [
		{ type: 'label', props: { text: obj => obj.AccountId }  },
		{ type: 'label', props: { text: obj => obj.Name }  },
		{ type: 'label', props: { text: obj => obj.Email ? obj.Email : 'N/A' }  },
		{ type: 'label', props: { text: obj => obj.Major ? obj.Major.Name : 'N/A' }  }
	]
};
