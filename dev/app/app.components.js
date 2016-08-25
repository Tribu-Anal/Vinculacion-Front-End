const Landing = require('./components/landing/landing-bundle.module'),
	  Main    = require('./components/main/main-bundle.module');

const moduleName   = 'vinculacion.components',
      dependencies = [ Landing, Main ];

angular.module(moduleName, dependencies);

module.exports = moduleName;