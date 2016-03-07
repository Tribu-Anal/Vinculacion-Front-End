(function() {
    'use strict';
    var app =angular
        .module('VinculacionApp');
    
    app
        .controller('tableController', tableController)

    tableController.$inject = [
       '$scope'
    ];

    function tableController($scope) {
        var ctrl = this;
        ctrl.bottonesCss = {};
        ctrl.actionContentCSS={};
        if($scope.acciones){
            for (let i = 0; i < $scope.cuerpo.length; i++) {
                $scope.cuerpo[i].visible = false;
            }
        }
        ctrl.onClickActions = function(index, accionesLength,actionVisible){
            actionVisible.visible=actionVisible.visible?false:true;
            let posicion = $("#buttonTB"+index).position();
            ctrl.bottonesCss.top = posicion.top+'px';
            ctrl.bottonesCss.position = 'absolute';
            let width = 100 + ((accionesLength-2)*50);
            ctrl.actionContentCSS.width = width+'px';
            ctrl.bottonesCss.left = (posicion.left - width +20)+'px';
        };

        ctrl.closeButtons = function(actionVisible,funcion){
            funcion;
            actionVisible.visible=false;      
        };
    }
})();