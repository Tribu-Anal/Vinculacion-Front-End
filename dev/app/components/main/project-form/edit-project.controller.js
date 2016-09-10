EditProjectController.$inject = [ 'TbUtils', 'projects', 'majors', '$stateParams' ];

function EditProjectController (TbUtils, projects, majors, stateParams) {

    const vm = this;

    vm.formTitle = 'Editar Proyecto';

    vm.project = JSON.parse(atob(stateParams.project));
    vm.project.MajorIds = [];
    vm.majors = [];

    vm.projectMajorsLoading = true;
    vm.majorsLoading = true;
    vm.submitting = false;

    vm.submit = submit;

    TbUtils.getAndLoad(majors.getMajors, vm.majors, () => { vm.majorsLoading = false; });

    majors.getMajorsByProject(vm.project.Id, 
                              resp => { vm.project.MajorIds = resp.data.map(obj => obj.MajorId); }, 
                              TbUtils.showErrorMessage, 
                              () => { vm.projectMajorsLoading = false; });

    function submit () {
        if (vm.project.MajorIds.length === 0) return;

        vm.submitting = true;
        TbUtils.updateAndGoTo(projects.updateProject, vm.project.Id, vm.project, 'main.projects', 
            'El proyecto fue actualizado exitosamente.', () => { vm.submitting = false; });
    }

}

module.exports = { name: 'EditProjectController', ctrl: EditProjectController };