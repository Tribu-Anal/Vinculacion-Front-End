(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .directive('tbSearch', tbSearch);

    function tbSearch() {
        var directive = {
            restrict: 'E',
            scope: {
                endpoint: '=?',
                onElementClick: '=?',
                responsePropertyShow: '=?'
            },
            controller: 'TbSearchController as vm',
            templateUrl: '../templates/shared/TB-Search/tb-search.html',
            link: function($scope, $element, $attrs, vm) {
                $scope.$watch('vm.searchInput', function(newValue, oldValue) {
                    if (typeof newValue === 'string' || !vm.searchInput) {
                        $scope.searchInput = newValue;
                        if ($scope.searchInput)
                            setTimeout(vm.realoadSearch, 800);
                        else
                            vm.emptyElementsToShowArray();
                    }
                });
            }
        };

        return directive;
    }

})();