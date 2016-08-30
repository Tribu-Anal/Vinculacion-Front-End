const tbTableRow  = require('./tb-table-row.module'),
      tbTableElem = require('./TB-TableElem/tb-table-elem-bundle.module');

const moduleName   = 'tb-table-row-bundle.shared',
      dependencies = [ tbTableRow, tbTableElem ];

angular.module(moduleName, dependencies);

module.exports = moduleName;