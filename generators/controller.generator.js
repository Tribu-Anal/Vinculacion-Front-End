'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Controller Generator',
    generator: {
        description: 'This generates a controller for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your controller\'s name?',
            validate: value => {  return genUtils.isRequired(value, "Controller name");  }
        },
        {
            type: 'directory',
            name: 'path',
            message: 'Choose the folder for your controller:',
            basePath: './dev/app'
        }
        ],
        actions: [
            {
                type: 'add',
                path: './dev/app/{{path}}/{{dashCase name}}.controller.js',
                templateFile: `${genUtils.TEMPLATES_PATH}/controller.template.js`
            }
        ]
    }
};