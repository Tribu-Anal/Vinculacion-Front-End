describe('tableContent', function() {

    var service;

    beforeEach(function() {
        module('VinculacionApp');
    });

    describe('createAnInputElement', function() {
        it('should return an object with the specified properties for an input element',
            inject(function(tableContent) {
                let inputProperties = {
                    value: '10',
                    type: 'text',
                    min: 0,
                    max: 100
                };
                let input = {
                    typeObject: 'input',
                    properties: {
                        value: inputProperties.value,
                        type: inputProperties.type,
                        min: inputProperties.min,
                        max: inputProperties.max
                    }
                };
                let generate = tableContent.createAnInputElement(inputProperties);
                expect(generate).toEqual(input);
            }));
    });
    describe('createALableElement', function() {
        it('should return an object with the specified properties for a label element',
            inject(function(tableContent, TbUtils) {
                let label = {
                    typeObject: 'label',
                    properties: {
                        value: 'Test',
                        click: TbUtils.preventGeneralLoading
                    }
                };
                let generate = tableContent.createALableElement('test');
                expect(generate).toEqual(label);
            }));
    });
    describe('createAButtonElement', function() {
        it('should return an object with the specified properties for a button element',
            inject(function(tableContent) {
                let buttonProperties = {
                    icon: 'glyphicon-test',
                    onClick: function() {},
                    tooltip: 'Tooltip'
                }
                let button = {
                    typeObject: 'button',
                    properties: {
                        onClick: buttonProperties.onClick,
                        icon: buttonProperties.icon,
                        tooltip: buttonProperties.tooltip
                    }
                };
                let generate = tableContent.createAButtonElement(buttonProperties);
                expect(generate).toEqual(button);
            }));
    });

});