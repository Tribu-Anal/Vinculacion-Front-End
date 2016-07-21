const Landing = require('./components/landing/landing.component'),
	  Main    = require('./components/main/main.component');

const moduleName   = 'vinculacion.components',
      dependencies = [ Landing, Main ];

angular.module(moduleName, dependencies);

module.exports = moduleName;