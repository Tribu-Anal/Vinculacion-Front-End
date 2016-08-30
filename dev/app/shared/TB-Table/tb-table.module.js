const tbTableHeader = require('./TB-TableHeader/tb-table-header.module'),
	  tbTableRow    = require('./TB-TableRow/tb-table-row-bundle.module');

const directive  = require('./tb-table.directive'),
      controller = require('./tb-table.controller');

const moduleName   = 'tb-table',
      dependencies = [ tbTableHeader, tbTableRow ];

angular.module(moduleName, dependencies)
	.directive(directive.name, directive.drtv)
	.controller(controller.name, controller.ctrl);

module.exports = moduleName;