const tbButton    = require('./shared/TB-Button/tb-button.module'),
      tbHeaderbar = require('./shared/TB-Headerbar/tb-headerbar.module'),
	  tbLoading   = require('./shared/TB-Loading/tb-loading.module'),
	  tbPaginator = require('./shared/TB-Paginator/tb-paginator.module'),
	  tbSearchField = require('./shared/TB-SearchField/tb-search-field.module'),
	  tbRoundBtn  = require('./shared/TB-RoundBtn/tb-round-btn.module'),
	  tbSearch    = require('./shared/TB-Search/tb-search.module'),
	  tbSidebar   = require('./shared/TB-Sidebar/tb-sidebar.module'),
	  tbTable     = require('./shared/TB-Table/tb-table.module'),
	  tbUploadBtn = require('./shared/TB-Upload-Btn/tb-upload-btn.module');

const moduleName  = 'vinculacion.shared',
     dependencies = [ tbButton, tbHeaderbar, tbLoading, tbPaginator, 
                      tbSearchField, tbRoundBtn, tbSearch, tbSidebar, tbTable, tbUploadBtn ];

angular.module(moduleName, dependencies);

module.exports = moduleName;