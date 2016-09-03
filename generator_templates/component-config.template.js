config.$inject = [ '$stateProvider' ];

function config ($stateProvider) {

	$stateProvider
		.state('{{stateName}}', {
			url: '{{url}}',
			templateUrl: 'templates/components/{{templateFolderPath}}/{{dashCase name}}/{{dashCase name}}.html',
			controller: "{{properCase name}}Controller as vm",
			onEnter: onStateEnter
		});
}

const onStateEnter = [ '$rootScope', 
	rootScope => { 
		rootScope.viewTitle  = "Vinculacion | {{tabTitle}}";
    	rootScope.viewStyles = "{{styles}}";
    }
];

module.exports = config;