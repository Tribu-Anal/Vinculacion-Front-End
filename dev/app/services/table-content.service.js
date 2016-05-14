(function() {
	"use strict";

	angular
		.module('VinculacionApp')
		.factory('tableContent', tableContent);

	tableContent.$inject = [];

	function tableContent () {
	   var service = {
            createAnInputElement:createAnInputElement,
            createALableElement:createALableElement
        };
        
        return service;
        
        function createAnInputElement(inputType, modelValue) {
            let element = {
                typeObject: 'input',
                properties: {
                    value: modelValue,
                    type: inputType
                }
            }
            return element;
        };

        function createALableElement(modelValue) {
            let element = {
                typeObject: 'label',
                properties: {
                    value: modelValue
                }
            }
            return element;
        };
	}
})();