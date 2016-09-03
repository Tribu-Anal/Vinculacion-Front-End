module.exports = {
	headers: [ 'Periodo', 'Desde', 'Hasta' ],
	rows: [
		{ type: 'label', props: { text: obj => obj.Number + " - " + obj.Year }  },
		{ type: 'label', props: { text: obj => obj.FromDate ? obj.FromDate : 'N/A' }  },
		{ type: 'label', props: { text: obj => obj.ToDate ? obj.ToDate : 'N/A' }  }
	]
};
