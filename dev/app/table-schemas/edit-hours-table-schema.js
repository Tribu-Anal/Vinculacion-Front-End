module.exports = inputDisabled => {
	return {
		headers: ['Número de Cuenta', 'Nombre', 'Horas en este proyecto'],
		rows: [
			{ type: 'label', props: { text: obj => obj.User.AccountId }  },
			{ type: 'label', props: { text: obj => obj.User.Name }  },
			{ type: 'input', props: { model: obj => obj.User.Hours ? obj.User.Hours.Amount : 0, disable: '', 
				                      inputDisabled: inputDisabled, type: 'number', min: 0, max: 100 } }
		]
	};
};