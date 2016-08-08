config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('main.sectionParticipants', {
			url: '/secciones-participantes/{projectId}/{sectionId}',
			templateUrl: 'templates/components/main/section-participants/section-participants.html',
			controller: "SectionParticipantsController as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | Participantes";
    	rootScope.viewStyles = "main section-participants";
    }
];

module.exports = config;