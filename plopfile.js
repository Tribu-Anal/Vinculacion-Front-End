'use strict';

const componentGen = require('./generators/component.generator');

module.exports = plop => {
	plop.addPrompt('directory', require('inquirer-directory'));

    plop.setGenerator(componentGen.name, componentGen.generator);
    // plop.setGenerator();
    // plop.setGenerator();
    // plop.setGenerator();
};