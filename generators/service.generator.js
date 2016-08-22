'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Service Generator',
    generator: {
        description: 'This generates a service for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your service\'s name?',
            validate: value => {  return genUtils.isRequired(value, "Service name");  }
        },
        {
            type: 'confirm',
            name: 'createBundle',
            message: 'Do you want a bundle?'
        },
        {
            type: 'directory',
            name: 'servicePath',
            message: 'Choose the folder for your service:',
            basePath: './dev/app/services'
        }
        ],
        actions: data => {
            let actions = [];
            const servicePath = 
            `${genUtils.SERVICES_PATH}/{{pathCase servicePath}}/{{properCase name}}/{{dashCase name}}`;

            data.type = 'service';

            actions.push({
                type: 'add',
                path: `${servicePath}.module.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/service-module.template.js`
            });

            actions.push({
                type: 'add',
                path: `${servicePath}.service.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/service.template.js`
            });

            if (data.createBundle) {
                actions.push({
                    type: 'add',
                    path: `${servicePath}-bundle.module.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/module-bundle.template.js`
                });
            }

            return actions;
        }
    }
};