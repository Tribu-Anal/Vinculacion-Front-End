'use strict';

const componentGen     = require('./generators/component.generator'),
      crudComponentGen = require('./generators/crud-component.generator'),
      serviceGen       = require('./generators/service.generator'),
      sharedGen        = require('./generators/shared.generator'),
      bundleGen        = require('./generators/bundle.generator'),
      controllerGen    = require('./generators/controller.generator'),
      configGen        = require('./generators/config.generator'),
      runGen           = require('./generators/run.generator');

module.exports = plop => {
	plop.addHelper('sharedCase', require('./generators/helpers').sharedCase);
	plop.addPrompt('directory', require('inquirer-directory'));

    plop.setGenerator(componentGen.name, componentGen.generator);
    plop.setGenerator(crudComponentGen.name, crudComponentGen.generator);
    plop.setGenerator(serviceGen.name, serviceGen.generator);
    plop.setGenerator(sharedGen.name, sharedGen.generator);
    plop.setGenerator(bundleGen.name, bundleGen.generator);
    plop.setGenerator(controllerGen.name, controllerGen.generator);
    plop.setGenerator(configGen.name, configGen.generator);
    plop.setGenerator(runGen.name, runGen.generator);
};