module.exports = btnClick => {
	return {
		headers: ['Codigo', 'Clase', 'Periodo', 'Catedratico', 'Editar'],
		rows: [
			{ type: 'label',  props: { text: obj => obj.Code }  },
			{ type: 'label',  props: { text: obj => obj.Class.Name }  },
			{ type: 'label',  props: { text: obj => obj.Period.Number + " - " + obj.Period.Year }  },
			{ type: 'label',  props: { text: obj => obj.User ? obj.User.Name : 'N/A' }  },
			{ type: 'button', props: { icon: 'glyphicon glyphicon-pencil', 
				                       tooltip: 'Editar Seccion', 
				                       onClick: btnClick } }
		]
	};
};
