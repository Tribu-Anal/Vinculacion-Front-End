(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('TbUtils', TbUtils);
    
    TbUtils.$inject = ['toaster'];

	function TbUtils (toaster) {        
        var service = {
            fillList: fillList,
            displayNotification: displayNotification
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
                    body: body
                }
            );
        }
	}
})();