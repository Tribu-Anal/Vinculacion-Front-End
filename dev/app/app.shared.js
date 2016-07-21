const tbHeaderbar = require('./shared/TB-Headerbar/tb-headerbar'),
	  tbLoading   = require('./shared/TB-Loading/tb-loading'),
	  tbRoundBtn  = require('./shared/TB-RoundBtn/tb-round-btn'),
	  tbSearch    = require('./shared/TB-Search/tb-search'),
	  tbSidebar   = require('./shared/TB-Sidebar/tb-sidebar'),
	  tbTable     = require('./shared/TB-Table/tb-table');

const moduleName  = 'vinculacion.shared',
     dependencies = [ tbHeaderbar, tbLoading, tbRoundBtn, 
	                  tbSearch, tbSidebar, tbTable ];

angular.module(moduleName, dependencies);

module.exports = moduleName;