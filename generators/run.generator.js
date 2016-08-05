'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Run Generator',
    generator: {
        description: 'This generates a run for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your run\'s name?',
            validate: value => {  return genUtils.isRequired(value, "Run name");  }
        },
        {
            type: 'directory',
            name: 'path',
            message: 'Choose the folder for your run:',
            basePath: './dev/app'
        }
        ],
        actions: [
            {
                type: 'add',
                path: './dev/app/{{path}}/{{dashCase name}}.run.js',
                templateFile: `${genUtils.TEMPLATES_PATH}/run.template.js`
            }
        ]
    }
};