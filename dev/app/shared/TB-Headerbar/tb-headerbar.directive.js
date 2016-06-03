"use strict";

function tbHeaderbar() {
    var directive = 
    {
        restrict: 'E',
        scope: {
            expand: '=?'
        },
        templateUrl: 'templates/shared/TB-Headerbar/tb-headerbar.html'        
    };

    return directive;
}

module.exports = tbHeaderbar;