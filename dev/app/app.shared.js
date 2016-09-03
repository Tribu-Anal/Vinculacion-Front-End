const tbButton      = require('./shared/TB-Button/tb-button.module'),
      tbHeaderbar   = require('./shared/TB-Headerbar/tb-headerbar.module'),
	  tbLoading     = require('./shared/TB-Loading/tb-loading.module'),
	  tbLoadMore    = require('./shared/TB-LoadMoreBtn/tb-load-more-btn.module'),
	  tbPaginator   = require('./shared/TB-Paginator/tb-paginator.module'),
	  tbSearchField = require('./shared/TB-SearchField/tb-search-field.module'),
	  tbRoundBtn    = require('./shared/TB-RoundBtn/tb-round-btn.module'),
	  tbSidebar     = require('./shared/TB-Sidebar/tb-sidebar.module'),
	  tbTable       = require('./shared/TB-Table/tb-table.module'),
	  tbUploadBtn   = require('./shared/TB-Upload-Btn/tb-upload-btn.module');

const moduleName  = 'vinculacion.shared',
     dependencies = [ tbButton, tbHeaderbar, tbLoading, tbLoadMore, tbPaginator, tbSearchField, 
                      tbRoundBtn, tbSidebar, tbTable, tbUploadBtn ];

angular.module(moduleName, dependencies);

module.exports = moduleName;