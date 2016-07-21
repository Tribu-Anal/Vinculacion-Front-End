const Landing = require('./components/landing/landing-bundle.module');

const moduleName   = 'vinculacion.components',
      dependencies = [ Landing ];

angular.module(moduleName, dependencies);

module.exports = moduleName;