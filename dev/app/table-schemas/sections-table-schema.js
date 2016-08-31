module.exports = {
	headers: ['Codigo', 'Clase', 'Periodo'],
	rows: [
		{ type: 'label', props: { text: obj => obj.Code }  },
		{ type: 'label', props: { text: obj => obj.Class.Name }  },
		{ type: 'label', props: { text: obj => obj.Period.Number+" - "+obj.Period.Year }  }
	]
};
