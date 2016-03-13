(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope'];

    /*
     * @todo Evitar $scope
     * @todo Evitar DOM manipulation
     * @todo Revisar codigo
     */
    function TableController ($scope) {
        var vm = this;

        vm.buttonsCSS = {};
        vm.actionContentCSS = {};
        vm.onClickActions = onClickActions;
        vm.closeButtons = closeButtons;

        function onClickActions(index, actionLength, actionVisible) {
            actionVisible.visible = !actionVisible.visible;

            let position = $("#buttonTB" + index).position();

            vm.buttonsCSS.top = position.top + 'px';
            vm.buttonsCSS.position = 'absolute';

            let width = 100 + ( (actionLength - 2) * 50 );

            vm.actionContentCSS.width = width + 'px';
            vm.buttonsCSS.left = (position.left - width + 20) + 'px';
        };

        function closeButtons (actionVisible, funct) {
            funct;
            actionVisible.visible = false;      
        };

        if($scope.actions){
            for (let i = 0; i < $scope.body.length; i++) {
                $scope.body[i].visible = false;
            }
        }

    }
})();