tableContent.$inject = ['TbUtils'];

function tableContent (TbUtils) {
    const VALID_TYPES = [ 'label', 'input', 'button', 'icon' ];
    const EVAL_SKIP_PROPS = [ 'onClick' ];

    const service = {
        createNewElement: createNewElement
    };

    return service;

    function createNewElement(type, props, data) {
        const invalid = !VALID_TYPES.includes(type);

        const element = {
            type: invalid ? 'label' : type,
            props: invalid ? { text: 'Invalid Element Type' }  : evalProps(props, data)
        };

        return element;
    }

    function evalProps (props, data) {
        let evaluatedProps = {};

        if (typeof props === 'function')
            evaluatedProps = props(data);

        else {
            for (const key in props) {
                const prop = props[key];

                if (typeof prop === 'function' && !EVAL_SKIP_PROPS.includes(key))
                    evaluatedProps[key] = prop(data);
                else
                    evaluatedProps[key] = prop;
            }
        }

        return evaluatedProps;
    }

}

module.exports = { name: 'tableContent', srvc: tableContent };
