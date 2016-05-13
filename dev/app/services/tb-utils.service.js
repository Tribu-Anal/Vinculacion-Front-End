(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('TbUtils', TbUtils);
    
    TbUtils.$inject = ['toaster', '$rootScope'];

	function TbUtils (toaster, $rootScope) {        
        var service = {
            fillList: fillList,
            displayNotification: displayNotification,
            preventGeneralLoading: preventGeneralLoading,
            initArrayToValue: initArrayToValue,
            removeItemFromList: removeItemFromList
        };
        
        return service;
        
        function fillList(response, list) {
            for(let obj in response.data) {
                list.push(response.data[obj]);
            }
        };
        
        function displayNotification(type, title, body) {
            toaster.pop(
                {
                    type: type, 
                    title: title, 
                    body: body,
                    timeout: 1500
                }
            );
        }

        function preventGeneralLoading () {
            $rootScope.generalLoading = false;
        }

        function initArrayToValue (array, value, size) {
            for (let i = 0; i < size; i++)
                array.push(value);
        }

        function removeItemFromList (listItem, list) {
            let indexOfItem = list.indexOf(list);
            list.splice(indexOfItem, 1);
        }
	}
})();