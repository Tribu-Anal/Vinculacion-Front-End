"use strict";

function tbSidebar() {
    var directive = 
    {
        restrict: 'E',
        scope: {
            navItems: '='
        },
        controller: 'TbSidebarController as vm',
        templateUrl: 'templates/shared/TB-Sidebar/tb-sidebar.html'        
    };

    return directive;
}

module.exports = tbSidebar;