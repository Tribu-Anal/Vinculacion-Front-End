'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Shared Component Generator',
    generator: {
        description: 'This generates a shared component for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your shared component\'s name?',
            validate: value => {  return genUtils.isRequired(value, "Shared component name");  }
        },
        {
            type: 'checkbox',
            name: 'genChoices',
            message: 'What would you like for your component?',
            choices: [ 'Template', 'Controller', 'Stylesheet', 'Run', 'Config', 'Bundle' ]
        },
        {
            type: 'directory',
            name: 'sharedPath',
            message: 'Choose where you want your shared component:',
            basePath: './dev/app/shared'
        }
        ],
        actions: data => {
            let actions = [];
            const sharedPath = 
            `${genUtils.SHARED_PATH}/{{pathCase sharedPath}}/{{sharedCase name}}/{{dashCase name}}`;

            data.hasConfig = genUtils.arrContains(data.genChoices, 'Config');
            data.hasController = genUtils.arrContains(data.genChoices, 'Controller');
            data.hasRun = genUtils.arrContains(data.genChoices, 'Run');
            data.hasTemplate = genUtils.arrContains(data.genChoices, 'Template');
            data.hasStylesheet = genUtils.arrContains(data.genChoices, 'Stylesheet');
            data.createBundle = genUtils.arrContains(data.genChoices, 'Bundle');

            data.type = 'shared';

            actions.push({
                type: 'add',
                path: `${sharedPath}.module.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/shared-module.template.js`
            });

            actions.push({
                type: 'add',
                path: `${sharedPath}.directive.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/directive.template.js`
            });            

            if (data.hasConfig) {
                actions.push({
                    type: 'add',
                    path: `${sharedPath}.config.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/config.template.js`
                });
            }

            if (data.hasController) {
                actions.push({
                    type: 'add',
                    path: `${sharedPath}.controller.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/controller.template.js`
                });
            }

            if (data.hasRun) {
                actions.push({
                    type: 'add',
                    path: `${sharedPath}.run.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/run.template.js`
                });
            }

            if (data.createBundle) {
                actions.push({
                    type: 'add',
                    path: `${sharedPath}-bundle.module.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/module-bundle.template.js`
                });
            }


            if (data.hasStylesheet) {
                actions.push({
                    type: 'add',
                    path: `${sharedPath}.scss`,
                    template: `.{{dashCase name}} {\n\n\n}\n`
                });
            }

            if (data.hasTemplate) {
                actions.push({
                    type: 'add',
                    path: `${sharedPath}.html`,
                    template: ' '
                });
            }

            return actions;
        }
    }
};