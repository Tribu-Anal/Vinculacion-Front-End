tableBuilder.$inject = [ 'tableContent' ];

function tableBuilder (tableContent) {
	const service = {
		newTable: newTable
	};

	function newTable (model) {
        const table = {
            headers: model.headers,
            rows: []
        };

        const data = model.data;
        const schema = model.schema;

        for (const obj of data) {

            const row = {
                elements: [],
                data: obj
            };

            for (const sc of schema) {
                let elem = tableContent.createALabelElement({ text: 'Invald Type' });

                if (sc.type === 'label')
                    elem = tableContent.createALabelElement(sc.props);
                else if (sc.type === 'input')
                    elem = tableContent.createAnInputElement(sc.props);
                else if (sc.type === 'button')
                    elem = tableContent.createAButtonElement(sc.props);
                else if (sc.type === 'icon')
                    elem = tableContent.createIconElement(sc.props);

                row.elements.push(elem);
            }

            table.rows.push(row);
        }

        return table;
    }

	return service;
}

module.exports = { name: 'tableBuilder', srvc: tableBuilder };