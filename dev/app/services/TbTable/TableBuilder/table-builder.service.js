tableBuilder.$inject = [ 'tableContent' ];

function tableBuilder (tableContent) {
	const service = {
		newTable: newTable,
        emptyTable: emptyTable
	};

	function newTable (schema, model) {
        const table = {
            headers: schema.headers,
            rows: []
        };

        for (const obj of model)
            append(table, schema.rows, obj);

        return table;
    }

    function append (table, rowSchema, data) {
        const row = {
            elements: [],
            data: data
        };

        for (const sc of rowSchema) {
            let elem = tableContent.createNewElement(sc.type, sc.props, data);
            row.elements.push(elem);
        }

        table.rows.push(row);
    }

    function emptyTable () {
        return {
            headers: [],
            rows: []
        };
    }

	return service;
}

module.exports = { name: 'tableBuilder', srvc: tableBuilder };