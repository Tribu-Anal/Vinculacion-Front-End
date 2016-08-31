module.exports = {
	headers: ['Id Proyecto', 'Nombre'],
	rows: [
		{ type: 'label', props: { text: obj => obj.Id }  },
		{ type: 'label', props: { text: obj => obj.Name }  }
	]
};
