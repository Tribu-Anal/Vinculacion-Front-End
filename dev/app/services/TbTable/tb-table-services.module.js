const tableContent = require('./TableContent/table-content.module');

const moduleName   = 'tb-table-services',
      dependencies = [ tableContent ];

angular.module(moduleName, dependencies);

module.exports = moduleName;