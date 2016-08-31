module.exports = {
	headers: [ 'Numero de Cuenta', 'Nombre' ],
	schema: [
		{ type: 'label', props: { text: obj => obj.AccountId }  },
		{ type: 'label', props: { text: obj => obj.Name }  }
	],
	data: null
};