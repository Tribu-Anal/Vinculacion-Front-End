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
            initArrayToValue: initArrayToValue
        };
        
        return service;
        
        function fillList(response, list) {
            console.log(response);
            for(let obj in response.data) {
                list.push(response.data[obj]);
            }
            
            console.log(list);
        };
        
        function displayNotification(type, title, body) {
            toaster.pop(
                {
                    type: type, 
                    title: title, 
                    body: body
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

	}
})();