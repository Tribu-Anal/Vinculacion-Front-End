tableContent.$inject = ['TbUtils'];

function tableContent (TbUtils) {
    const service = {
        createAnInputElement: createAnInputElement,
        createALableElement: createALableElement,
        createAButtonElement: createAButtonElement,
        createIconElement: createIconElement
    };

    return service;

    function createAnInputElement(inputProperties) {
        const element = {
            type: 'input',
            props: {
                value: inputProperties.value,
                type: inputProperties.type,
                min: inputProperties.min,
                max: inputProperties.max
            }
        }

        return element;
    }

    function createALableElement(modelValue) {
        const element = {
            type: 'label',
            props: {
                value: TbUtils.toTitleCase(modelValue),
                click: TbUtils.preventGeneralLoading
            }
        }

        return element;
    }

    function createAButtonElement(objectButton) {
        const element = {
            type: 'button',
            props: {
                onClick: objectButton.onClick,
                icon: objectButton.icon,
                tooltip: objectButton.tooltip
            }
        }

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
