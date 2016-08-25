{{#if hasAny}}const {{#if hasConfig}} config{{#if hasController}}    {{/if}} = require('./{{dashCase name}}.config'){{#if hasController}},
	   controller = require('./{{dashCase name}}.controller'){{/if~}}{{#if hasRun}},
	   run {{#if hasController}}    {{/if}}   = require('./{{dashCase name}}.run'){{/if}};{{else~}}
	   {{~#if hasController}}controller = require('./{{dashCase name}}.controller'){{#if hasRun}},
	  run        = require('./{{dashCase name}}.run'){{/if}};{{else~}}
	   run = require('./{{dashCase name}}.run');{{/if}}{{/if}}

{{/if}}
const moduleName   = '{{dashCase name}}.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	{{~#if hasAny}}{{~#if hasConfig}}
	.config(config){{/if~}}
	{{#if hasRun}}

	.run(run){{/if~}}
	{{#if hasController}}

	.controller(controller.name, controller.ctrl){{/if~}}
	{{/if~}};

module.exports = moduleName;