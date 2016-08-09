tableBuilder.$inject = [ 'tableContent' ];

function tableBuilder (tableContent) {
	const service = {
		newTable: newTable
	};

	function newTable (headers, data, keys) {
        const table = {
            headers: headers,
            body: [],
            actions: true
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

            table.body.push(newTableElement);
        }

        return table;
    }

	return service;
}

module.exports = { name: 'tableBuilder', srvc: tableBuilder };