{{properCase name}}Controller.$inject = [ 'TbUtils', '{{camelCase service}}' ];

function {{properCase name}}Controller (TbUtils, {{camelCase service}}) {
	const vm = this;

    vm.searchResults = []   ;
    vm.{{camelCase modelSingular}}Obj = term => { return {  }; }; // Implement your searchObjProvider

    vm.{{camelCase modelPlural}} = [];
    vm.tableSchema = require('../../../table-schemas/{{camelCase schemaName}}-table-schema'){{#if delete}}(confirmDelete){{/if}};

    vm.pageSize = {{pageSize}};
    vm.get = {{camelCase service}}.getAndLoad;
    vm.hideLoadBtn = () => vm.{{camelCase modelPlural}}.length !== vm.searchResults.length;

    {{#if create}}vm.goToNew{{pascalCase modelSingular}} = () => { TbUtils.go('main.new-{{camelCase modelSingular}}'); };{{/if}}{{#if update}}{{#if create}}
    vm.edit{{pascalCase modelSingular}} = {{camelCase modelSingular}} => { TbUtils.go('main.edit-{{camelCase modelSingular}}', { {{camelCase modelSingular}}: btoa(JSON.stringify({{camelCase modelSingular}})) }); };

    vm.{{camelCase modelPlural}}Loading = true;
    {{~else~}}
    vm.edit{{pascalCase modelSingular}} = {{camelCase modelSingular}} => { TbUtils.go('main.edit-{{camelCase modelSingular}}', { {{camelCase modelSingular}}: btoa(JSON.stringify({{camelCase modelSingular}})) }); };

    vm.{{camelCase modelPlural}}Loading = true;{{/if}}
    {{~else}}
    {{~#if create}}

    vm.{{camelCase modelPlural}}Loading = true;{{else}}vm.{{camelCase modelPlural}}Loading = true;{{/if}}{{/if}}

    {{camelCase service}}.getAndLoad(0, vm.pageSize, vm.{{camelCase modelPlural}}, () => { vm.{{camelCase modelPlural}}Loading = false; });{{#if delete}}

    function confirmDelete ({{camelCase modelSingular}}) {
        TbUtils.confirm('Eliminar', 'Esta seguro de eliminar este dato?', result => { 
            if (result)
                {{camelCase service}}.deleteAndNotify({{camelCase modelSingular}}, 'El dato se elimino exitosamente.');
        });
    }{{/if}}

}

module.exports = { name: '{{properCase name}}Controller', ctrl: {{properCase name}}Controller };