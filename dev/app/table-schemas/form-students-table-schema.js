module.exports = {
	headers: [ 'Numero de Cuenta', 'Nombre' ],
	rows: [
		{ type: 'label', props: { text: obj => obj.AccountId }  },
		{ type: 'label', props: { text: obj => obj.Name }  }
	]
};
