(function() {
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('TbSearchController', TbSearchController);

    TbSearchController.$inject = ['$scope', '$http'];

    function TbSearchController($scope, $http) {
        var vm = this;
        vm.searchInput = '';
        $scope.searchInput = vm.searchInput;
        vm.realoadSearch = realoadSearch;
        vm.emptyElementsToShowArray = emptyElementsToShowArray;
        vm.elementsToShow = [];
        vm.showResults = false
        vm.clickElementList = clickElementList;
        vm.hideResultContainer=hideResultContainer;
        function realoadSearch() {
            let url = getUrl();
            if (!url)
                return;
            $http.get(url)
                .then(successReload);
        }

        function getUrl() {
            let url = $scope.endpoint;
            if (!$scope.searchInput)
                return undefined;
            url = url.replace('{MODEL}', $scope.searchInput);
            return url;
        }

        function successReload(response) {
            let data = response.data;
            let pass = true;
            pass = pass && $scope.responsePropertyShow.length>0;
            pass = pass && data.length>0;
            pass = pass && data[0].hasOwnProperty($scope.responsePropertyShow);
            if (!pass)
                return
            vm.elementsToShow = [];
            fillElementsToShowArray(data);
            showResultContainer();
        }

        function fillElementsToShowArray(elements) {
            for (let i = 0; i < elements.length; i++) {
                let element = {
                    value: elements[i][$scope.responsePropertyShow],
                    data: elements[i]
                }
                vm.elementsToShow.push(element);
            }
        }

        function emptyElementsToShowArray() {
            vm.elementsToShow = [];
        }

        function clickElementList(elementList){
            vm.searchInput = elementList.value;
            vm.showResults = false;
            if (typeof $scope.onElementClick === 'function'){
                $scope.onElementClick(elementList);
            } 
        }

        function showResultContainer(){
            vm.showResults = vm.elementsToShow.length>0;
        }

        function hideResultContainer(){
             setTimeout(showResultsEqualsFalse, 800);
        }

        function showResultsEqualsFalse(){
            vm.showResults = false;
        }
    }
})();