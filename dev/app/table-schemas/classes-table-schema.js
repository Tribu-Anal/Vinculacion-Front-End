module.exports = {
	headers: [ 'Codigo', 'Nombre' ],
	rows: [
		{ type: 'label', props: { text: obj => obj.Code }  },
		{ type: 'label', props: { text: obj => obj.Name }  }
	]
};
