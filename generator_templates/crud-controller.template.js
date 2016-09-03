{{properCase name}}Controller.$inject = [ 'TbUtils', '{{lowercase service}}' ];

function {{properCase name}}Controller (TbUtils, {{lowercase service}}) {
	const vm = this;

    vm.searchResults = [];
    vm.{{lowercase modelSingular}}Obj = term => { return {  }; }; // Implement your searchObjProvider

    vm.{{lowercase modelPlural}} = [];
    vm.tableSchema = require('../../../table-schemas/{{lowercase schemaName}}-table-schema'){{if delete}}(confirmDelete){{/if}};

    vm.pageSize = {{pageSize}};
    vm.get = {{lowercase service}}.getAndLoad;
    vm.hideLoadBtn = () => vm.{{lowercase modelPlural}}.length !== vm.searchResults.length;

    {{#if create}}vm.goToNew{{pascalCase modelSingular}} = () => { TbUtils.go('main.new-{{lowercase modelSingular}}'); };{{/if}}
    {{#if update}}vm.edit{{pascalCase modelSingular}} = {{lowercase modelSingular}} => { TbUtils.go('main.edit-{{lowercase modelSingular}}', { {{lowercase modelSingular}}: btoa(JSON.stringify({{lowercase modelSingular}})) }); };{{/if}}

	vm.{{lowercase modelPlural}}Loading = true;

    {{lowercase service}}.getAndLoad(0, vm.pageSize, vm.{{lowercase modelPlural}}, () => { vm.{{lowercase modelPlural}}Loading = false; });

    {{#if delete}}function confirmDelete ({{lowercase modelSingular}}) {
        TbUtils.confirm('Eliminar', 'Esta seguro de eliminar este dato?', result => { 
            if (result)
                {{lowercase service}}.deleteAndNotify({{lowercase modelSingular}}, 'El dato se elimino exitosamente.');
        });
    }{{/if}}

}

module.exports = { name: '{{properCase name}}Controller', ctrl: {{properCase name}}Controller };