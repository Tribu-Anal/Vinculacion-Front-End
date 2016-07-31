"use strict";

module.exports = {
	COMPONENTS_PATH: './dev/app/components',
	TEMPLATES_PATH: './generator_templates',
	isRequired: (value, name) => {
    	return (value.length > 0) ? true : `${name} is required.`;
	},
	arrContains: (arr, item) => { return arr.indexOf(item) >= 0; },
	whenHasConfig: answers => { return answers.genChoices.indexOf('Config') >= 0; }
};