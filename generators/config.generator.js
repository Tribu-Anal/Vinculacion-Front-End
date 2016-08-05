'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Config Generator',
    generator: {
        description: 'This generates a config for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your config\'s name?',
            validate: value => {  return genUtils.isRequired(value, "Config name");  }
        },
        {
            type: 'directory',
            name: 'path',
            message: 'Choose the folder for your config:',
            basePath: './dev/app'
        }
        ],
        actions: [
            {
                type: 'add',
                path: './dev/app/{{path}}/{{dashCase name}}.config.js',
                templateFile: `${genUtils.TEMPLATES_PATH}/config.template.js`
            }
        ]
    }
};