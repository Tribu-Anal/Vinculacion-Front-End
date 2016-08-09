tableBuilder.$inject = [ 'tableContent' ];

function tableBuilder (tableContent) {
	const service = {
		newTable: newTable
	};

	function newTable (headers, data, keys, buttons, inputs) {
        const table = {
            headers: headers,
            body: [],
            actions: false
        };

        for (let i = 0; i < data.length; i++) {
            const obj = data[i];

            const newTableElement = {
                content: [],
                data: obj
            };

            for (let k = 0; k < keys.length; k++) {
                const key = keys[k];
                newTableElement.content.push(tableContent.createALableElement(obj[key]));
            }

            for (let k = 0; buttons && k < buttons.length; k++)
                newTableElement.content.push(tableContent.createAButtonElement(buttons[k]));

            for (let k = 0; inputs && k < inputs.length; k++)
                newTableElement.content.push(tableContent.createAnInputElement(inputs[k]));

            table.body.push(newTableElement);
        }

        return table;
    }

	return service;
}

module.exports = { name: 'tableBuilder', srvc: tableBuilder };