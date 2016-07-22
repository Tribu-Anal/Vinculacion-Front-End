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

module.exports = { name: 'tbSidebar', drtv: tbSidebar };