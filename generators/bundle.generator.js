'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Bundle Generator',
    generator: {
        description: 'This generates a module bundler for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your bundle\'s name?',
            validate: value => {  return genUtils.isRequired(value, "Bundle name");  }
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type of bundle is this?',
            choices: [ 'component', 'service', 'shared' ]
        },
        {
            type: 'directory',
            name: 'bundlePath',
            message: 'Choose the folder for your bundle:',
            basePath: './dev/app'
        }
        ],
        actions: [
            {
                type: 'add',
                path: './dev/app/{{bundlePath}}/{{dashCase name}}-bundle.js',
                templateFile: `${genUtils.TEMPLATES_PATH}/module-bundle.template.js`
            }
        ]
    }
};