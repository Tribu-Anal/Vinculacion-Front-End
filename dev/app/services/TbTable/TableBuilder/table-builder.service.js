tableBuilder.$inject = [ 'tableContent' ];

function tableBuilder (tableContent) {
	const service = {
		newTable: newTable,
        append: append,
        indexOf: indexOf,
        remove: remove
	};

	function newTable (model) {
        const table = {
            headers: model.headers,
            rows: []
        };

        const data = model.data;
        const schema = model.schema;

        for (const obj of data)
            append(table, schema, obj);

        return table;
    }

    function append (table, schema, data) {
        if (!table || !schema || !data) return;

        const row = {
            elements: [],
            data: data
        };

        for (const sc of schema) {
            let elem = tableContent.createNewElement(sc.type, sc.props, data);
            row.elements.push(elem);
        }

        table.rows.push(row);
    }

    function indexOf (table, data) {
        if (!table || !table.rows || !data) return -1;
        return table.rows.indexOf(data);
    }

    function remove (table, index) {
        if (!table || !index) return;

        if (typeof index === 'object')
            index = indexOf(table, index);

        if (index >= 0)
            table.rows.splice(index, 1);
    }

	return service;
}

module.exports = { name: 'tableBuilder', srvc: tableBuilder };