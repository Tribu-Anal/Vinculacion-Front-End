const tbButton    = require('./shared/TB-Button/tb-button.module'),
      tbHeaderbar = require('./shared/TB-Headerbar/tb-headerbar.module'),
	  tbLoading   = require('./shared/TB-Loading/tb-loading.module'),
	  tbPaginator = require('./shared/TB-Paginator/tb-paginator.module'),
	  tbRoundBtn  = require('./shared/TB-RoundBtn/tb-round-btn.module'),
	  tbSearch    = require('./shared/TB-Search/tb-search.module'),
	  tbSidebar   = require('./shared/TB-Sidebar/tb-sidebar.module'),
	  tbTable     = require('./shared/TB-Table/tb-table.module');

const moduleName  = 'vinculacion.shared',
     dependencies = [ tbButton, tbHeaderbar, tbLoading, tbPaginator, 
                      tbRoundBtn, tbSearch, tbSidebar, tbTable ];

angular.module(moduleName, dependencies);

module.exports = moduleName;