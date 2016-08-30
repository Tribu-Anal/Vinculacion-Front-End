tableContent.$inject = ['TbUtils'];

function tableContent (TbUtils) {
    const service = {
        createAnInputElement: createAnInputElement,
        createALabelElement: createALableElement,
        createAButtonElement: createAButtonElement,
        createIconElement: createIconElement
    };

    return service;

    function createAnInputElement(input) {
        const element = {
            type: 'input',
            props: {
                model: input.model,
                type: input.type,
                min: input.min,
                max: input.max,
                inputDisabled: input.inputDisabled,
                disable: input.disable
            }
        };

        return element;
    }

    function createALabelElement(label) {
        const element = {
            type: 'label',
            props: {
                text: TbUtils.toTitleCase(label)
            }
        };

        return element;
    }

    function createAButtonElement(button) {
        const element = {
            type: 'button',
            props: {
                onClick: button.onClick,
                icon: button.icon,
                tooltip: button.tooltip
            }
        };

        return element;
    }

    function createIconElement (icon) {
        const element = {
            type: 'icon',
            props: {
                iconClass: icon.iconClass,
                fontSize: icon.fontSize
            }
        };

        return element;
    }

}

module.exports = { name: 'tableContent', srvc: tableContent };
