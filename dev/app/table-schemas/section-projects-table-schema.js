module.exports = {
	headers: ['Id Proyecto', 'Nombre'],
	rows: [
		{ type: 'label', props: { text: obj => obj.ProjectId }  },
		{ type: 'label', props: { text: obj => obj.Name }  }
	]
};
