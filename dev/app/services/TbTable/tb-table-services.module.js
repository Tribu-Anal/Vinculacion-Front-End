const tableBuilder = require('./TableBuilder/table-builder.module'),
      tableContent = require('./TableContent/table-content.module');

const moduleName   = 'tb-table-services',
      dependencies = [ tableBuilder, tableContent ];

angular.module(moduleName, dependencies);

module.exports = moduleName;