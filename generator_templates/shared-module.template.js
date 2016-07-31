const directive {{#if hasController}} {{/if}}= require('./{{dashCase name}}.directive'){{#if hasConfig}},
      config   {{#if hasController}} {{/if}} = require('./{{dashCase name}}.config'){{~/if}}{{#if hasController}},
      controller = require('./{{dashCase name}}.controller'){{~/if}}{{#if hasRun}},
      run    {{#if hasController}} {{/if}}   = require('./{{dashCase name}}.run'){{~/if}};

const moduleName   = '{{dashCase name}}.shared',
      dependencies = [];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)
	{{~#if hasConfig}}

	.config(config){{/if}}
	{{~#if hasRun}}

	.run(run){{/if}}
	{{~#if hasController}}
	
	.controller(controller.name, controller.ctrl){{/if}};

module.exports = moduleName;