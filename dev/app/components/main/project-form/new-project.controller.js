NewProjectController.$inject = [ 'TbUtils', 'projects', 'majors' ];

function NewProjectController (TbUtils, projects, majors) {

    const vm = this;

    vm.formTitle = 'Nuevo Proyecto';

    vm.project = {
        Name: '',
        Description: '',
        MajorIds: [],
        BeneficiarieOrganization: ''
    };
    vm.majors = [];

    vm.majorsLoading = true;
    vm.submitting = false;

    vm.submit = submit;

    TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false; });

    function submit () {
        if (vm.project.MajorIds.length === 0) return;

        vm.submitting = true;
        TbUtils.postAndGoTo(projects.postProject, vm.project, 'main.projects', 
            'El proyecto fue creado exitosamente.', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'NewProjectController', ctrl: NewProjectController };