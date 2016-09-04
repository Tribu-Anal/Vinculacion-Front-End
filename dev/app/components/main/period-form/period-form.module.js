const  config              = require('./period-form.config'),
	   newPeriodController = require('./new-period.controller');

const moduleName   = 'period-form.component',
      dependencies = [];

angular.module(moduleName, dependencies)
	.config(config)
	.controller(newPeriodController.name, newPeriodController.ctrl);

module.exports = moduleName;