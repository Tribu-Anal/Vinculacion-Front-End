'use strict';

const genUtils = require('./generator-utils');

module.exports = {
    name: 'CRUD Component Generator',
    generator: {
        description: 'This generates a component with a table, search, pagination, and more.',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your component name?',
            validate: value => {  return genUtils.isRequired(value, "Component name");  }
        },
        {
            type: 'checkbox',
            name: 'crudChoices',
            message: 'Select te CRUD operations for your component: (Read is default)',
            choices: [ 'Create', 'Update', 'Delete' ]
        },
        {
            type: 'input',
            name: 'modelSingular',
            message: 'What is your model name? (Singular)',
            validate: value => {  return genUtils.isRequired(value, "Model name (singular)");  }
        },
        {
            type: 'input',
            name: 'modelPlural',
            message: 'What is your model name? (Plural)',
            validate: value => {  return genUtils.isRequired(value, "Model name (plural)");  }
        },
        {
            type: 'input',
            name: 'service',
            message: 'What is your service name?',
            validate: value => {  return genUtils.isRequired(value, "Service name");  }
        },
        {
            type: 'input',
            name: 'pageSize',
            message: 'What is the page size?',
            validate: value => {  return genUtils.isRequired(value, "Page size");  }
        },
        {
            type: 'input',
            name: 'schemaName',
            message: 'What is the schema name?',
            validate: value => {  return genUtils.isRequired(value, "Schema name");  }
        },
        {
            type: 'input',
            name: 'stateName',
            message: 'What is your component\'s state name?',
            validate: value => {  return genUtils.isRequired(value, "State name");  }
        },
        {
            type: 'input',
            name: 'url',
            message: 'What is your component\'s url?',
            validate: value => {  return genUtils.isRequired(value, "Url");  }
        },
        {
            type: 'input',
            name: 'tabTitle',
            message: 'What is your component\'s tab title?',
            validate: value => {  return genUtils.isRequired(value, "Tab title");  }
        },
        {
            type: 'directory',
            name: 'templateFolderPath',
            message: 'Where is the template for the component?',
            basePath: './public/templates/components'
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

            data.create = genUtils.arrContains(data.crudChoices, 'Create');
            data.update = genUtils.arrContains(data.crudChoices, 'Update');
            data.delete = genUtils.arrContains(data.crudChoices, 'Delete');

            data.hasConfig = true;
            data.hasController = true;
            data.hasRun = false;
            data.hasAny = true;

            data.styles = "main";

            data.type = 'component';

            actions.push({
                type: 'add',
                path: `${componentPath}.module.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/component-module.template.js`
            });

            actions.push({
                type: 'add',
                path: `${componentPath}.config.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/component-config.template.js`
            });

            actions.push({
                type: 'add',
                path: `${componentPath}.controller.js`,
                templateFile: `${genUtils.TEMPLATES_PATH}/crud-controller.template.js`
            });

            actions.push({
                type: 'add',
                path: `${componentPath}.html`,
                templateFile: `${genUtils.TEMPLATES_PATH}/crud.template.html`
            });

            return actions;
        }
    }
};