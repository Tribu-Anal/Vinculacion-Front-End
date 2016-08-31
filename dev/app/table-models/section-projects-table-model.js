module.exports = {
	headers: ['Id Proyecto', 'Nombre'],
	schema: [
		{ type: 'label', props: { text: obj => obj.Id }  },
		{ type: 'label', props: { text: obj => obj.Name }  }
	],
	data: {}
};