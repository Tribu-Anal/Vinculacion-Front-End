(function() {
    'use strict';

    var app = angular
        .module('VinculacionApp');
    app
        .directive('tbTable', tbTable);

    function tbTable() {
        return {
            restrict: 'E',
            scope: {
                encabezado: '=?',
                cuerpo: '=?',
                acciones:"=?"
            },
            controller : 'tableController as tableCtrl',
            templateUrl: 'js/directives/table/table.view.html'
                       
        }
    };
})();