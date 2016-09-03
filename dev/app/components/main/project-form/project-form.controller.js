ProjectFormController.$inject = ['$rootScope', '$state', '$stateParams',
    'projects', 'sections',
    'majors', 'toaster',
    'TbUtils', '$location'
];

function ProjectFormController($rootScope, $state, $stateParams,
    projects, sections,
    majors, toaster,
    TbUtils, $location) {

    var vm = this;

    vm.edit = $state.current.name.includes('edit');
    vm.formLegend = vm.edit ? "Editar Proyecto" : "Nuevo Proyecto";

    vm.sections = [];
    vm.majors = [];
    vm.project = setProject();

    vm.majorsLoading = true;
    vm.sectionsLoading = true;
    vm.submitting = false;

    vm.submitProject = submitProject;
    vm.checkboxListItemClicked = checkboxListItemClicked;
    vm.majorsAndStatusValid = majorsAndStatusValid;
    vm.toTitleCase = TbUtils.toTitleCase;

    var editId = vm.edit ? vm.project.Id : -1;

    majors.getMajors(getMajorsSuccess, getMajorsFail);
    sections.getSections(getSectionsSuccess, getSectionsFail);

    function setProject() {
        return $stateParams.project ?
            JSON.parse($stateParams.project) : {
                Name: '',
                Description: '',
                MajorIds: [],
                SectionIds: [0],
                BeneficiarieOrganization: ''
            };
    }

    function submitProject() {
        vm.submitting = true;

        if (vm.edit) {
            removeProjectNonAPIProperties();
            updateProject();
        } else
            postNewProject();
    }

    function removeProjectNonAPIProperties() {
        delete vm.project.$$hashKey;
        delete vm.project.Id;
        delete vm.project.IsDeleted;
    }

    function updateProject() {
        if (vm.project.SectionIds.length === 0)
            vm.project.SectionIds = [0];

        projects.updateProject(editId, vm.project, updateSuccess, updateFailure);
    }

    function updateSuccess() {
        vm.submitting = false;

        TbUtils.preventGeneralLoading();
        $location.path('/proyectos');
        TbUtils.displayNotification('success', 'Proyecto Actualizado',
            'Se ha actualizado exitosamente el nuevo proyecto.');
    }

    function updateFailure(response) {
        vm.submitting = false;
        TbUtils.showErrorMessage(response.data);
    }

    function postNewProject() {
        projects.postProject(vm.project,
            submitProjectSuccess, submitProjectFail);
    }

    function checkboxListItemClicked(inputValue, listItemModel, listModel) {
        if (inputValue)
            listModel.push(listItemModel);
        else
            TbUtils.removeItemFromList(listItemModel, listModel);
    }

    function majorsAndStatusValid() {
        return vm.project.MajorIds.length > 0;
    }

    function getMajorsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.majors);

        vm.majorsLoading = false;
    }

    function getSectionsSuccess(response) {
        TbUtils.fillListWithResponseData(response.data, vm.sections);

        vm.sectionsLoading = false;
    }

    function getMajorsFail(response) {
        TbUtils.showErrorMessage(response.data);
        vm.majorsLoading = false;
    }

    function getSectionsFail(response) {
        TbUtils.showErrorMessage(response.data);
        vm.sectionsLoading = false;
    }

    function submitProjectSuccess() {
        vm.submitting = false;

        TbUtils.preventGeneralLoading();
        $location.path('/proyectos');
        TbUtils.displayNotification('success', 'Proyecto Creado',
            'Se ha creado exitosamente el nuevo proyecto.');
    }

    function submitProjectFail(response) {
        vm.submitting = false;
        TbUtils.showErrorMessage(response.data);
    }
}

module.exports = {
    name: 'ProjectFormController',
    ctrl: ProjectFormController
};