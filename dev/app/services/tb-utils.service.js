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
	}
})();