const tbTableElem      = require('./tb-table-elem.module'),
      tbTableLabelElem = require('./TB-TableLabelElem/tb-table-label-elem.module'),
      tbTableInputElem = require('./TB-TableInputElem/tb-table-input-elem.module'),
      tbTableBtnElem   = require('./TB-TableBtnElem/tb-table-btn-elem.module'),
      tbTableIconElem  = require('./TB-TableIconElem/tb-table-icon-elem.module');

const moduleName   = 'tb-table-elem-bundle.shared',
      dependencies = [ tbTableElem, tbTableLabelElem, tbTableInputElem, 
                       tbTableBtnElem, tbTableIconElem ];

angular.module(moduleName, dependencies);

module.exports = moduleName;