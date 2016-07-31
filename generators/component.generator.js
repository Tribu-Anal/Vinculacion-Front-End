'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'Component Generator',
    generator: {
        description: 'This generates a component for angular 1.x.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your component name?',
            validate: value => {  return genUtils.isRequired(value, "Component name");  }
        },
        {
            type: 'checkbox',
            name: 'genChoices',
            message: 'What would you like for your component?',
            choices: [ 'Config', 'Controller', 'Run', 'Stylesheet', 'Bundle' ]
        },
        {
            type: 'input',
            name: 'stateName',
            message: 'What is your component\'s state name?',
            validate: value => {  return genUtils.isRequired(value, "State name");  },
            when: genUtils.whenHasConfig
        },
        {
            type: 'input',
            name: 'url',
            message: 'What is your component\'s url?',
            validate: value => {  return genUtils.isRequired(value, "Url");  },
            when: genUtils.whenHasConfig
        },
        {
            type: 'directory',
            name: 'templateFolderPath',
            message: 'Where is the template for the component?',
            basePath: './public/templates/components',
            when: genUtils.whenHasConfig
        },
        {
            type: 'input',
            name: 'tabTitle',
            message: 'What is your component\'s tab title?',
            validate: value => {  return genUtils.isRequired(value, "Tab title");  },
            when: genUtils.whenHasConfig
        },
        {
            type: 'input',
            name: 'styles',
            message: 'What are your component\'s styles? (CSS active classes)',
            validate: value => {  return genUtils.isRequired(value, "Styles string");  },
            when: genUtils.whenHasConfig
        },
        {
            type: 'directory',
            name: 'componentPath',
            message: 'Choose where you want your component:',
            basePath: './dev/app/components'
        }
        ],
        actions: data => {
            let actions = [];
            const componentPath = 
            `${genUtils.COMPONENTS_PATH}/{{pathCase componentPath}}/{{dashCase name}}/{{dashCase name}}`;

            data.hasConfig = genUtils.arrContains(data.genChoices, 'Config');
            data.hasController = genUtils.arrContains(data.genChoices, 'Controller');
            data.hasRun = genUtils.arrContains(data.genChoices, 'Run');
            data.hasAny = data.hasConfig || data.hasController || data.hasRun;

            data.hasStylesheet = genUtils.arrContains(data.genChoices, 'Stylesheet');
            data.createBundle = genUtils.arrContains(data.genChoices, 'Bundle');

            data.type = 'component';

            actions.push({
                type: 'add',
                path: `${componentPath}.module.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/component-module.template.js`
            });

            if (data.hasConfig) {
                actions.push({
                    type: 'add',
                    path: `${componentPath}.config.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/component-config.template.js`
                });
            }

            if (data.hasController) {
                actions.push({
                    type: 'add',
                    path: `${componentPath}.controller.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/component-controller.template.js`
                });
            }

            if (data.hasRun) {
                actions.push({
                    type: 'add',
                    path: `${componentPath}.run.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/run.template.js`
                });
            }

            if (data.createBundle) {
                actions.push({
                    type: 'add',
                    path: `${componentPath}-bundle.module.js`,
                    templateFile: `${genUtils.TEMPLATES_PATH}/module-bundle.template.js`
                });
            }


            if (data.hasStylesheet) {
                actions.push({
                    type: 'add',
                    path: `${componentPath}.scss`,
                    template: `.{{dashCase name}} {\n\n\n}\n`
                });
            }

            actions.push({
                type: 'add',
                path: `${componentPath}.html`,
                template: ' '
            });

            return actions;
        }
    }
};