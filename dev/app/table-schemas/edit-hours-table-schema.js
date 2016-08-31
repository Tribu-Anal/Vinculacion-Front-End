module.exports = inputDisabled => {
	return {
		headers: ['Número de Cuenta', 'Nombre', 'Horas en este proyecto'],
		rows: [
			{ type: 'label', props: { text: obj => obj.User.AccountId }  },
			{ type: 'label', props: { text: obj => obj.User.Name }  },
			{ type: 'input', props: { model: obj => obj.Hours.Amount, disable: '', 
				                      inputDisabled: inputDisabled, type: 'number', min: 0, max: 100 } }
		]
	};
};