EditSectionController.$inject = [ 'TbUtils', 'sections', 'classes', 
                                 'professors', 'students', 'filterFilter', '$stateParams' ];

function EditSectionController (TbUtils, sections, classes, professors, students, filterFilter, stateParams) {

    const vm = this;

    vm.formTitle = 'Editar Seccion';

    vm.section = JSON.parse(atob(stateParams.section));
    vm.section.ClassId = vm.section.Class.Id;
    vm.section.ProffesorAccountId = vm.section.User.AccountId;
    vm.classes = [];
    vm.professors = [];
    vm.students = [];

    vm.selectedStudents = [];
    vm.tableSchema = require('../../../table-schemas/form-students-table-schema');

    vm.submit = submit
    vm.addStudent = addStudent;
    vm.search = search;

    vm.removeStudent = student => { TbUtils.removeItemFromList(student, vm.selectedStudents); };

    vm.classesLoading = true;
    vm.professorLoading = true;
    vm.studentsLoading = true;
    vm.submitting = false;

    TbUtils.getAndLoad(classes.get, vm.classes, () => { vm.classesLoading = false; });
    TbUtils.getAndLoad(professors.get, vm.professors, () => { vm.professorsLoading = false; });
    TbUtils.getAndLoad(students.get, vm.students, () => { vm.studentsLoading = false; });
    TbUtils.getExistingAndLoad(sections.getStudents, vm.section.Id, vm.selectedStudents);

    function submit () {
        vm.submitting = true;

        sections.update(vm.section.Id, vm.section, assignStudents, 
            resp => { TbUtils.showErrorMessage(resp.data); vm.submitting = false; });
    }

    function assignStudents (resp) {
        const studentIds = vm.selectedStudents.map(obj => obj.AccountId);

        TbUtils.assignAndGoTo(sections.reassignStudents, vm.section.Id, studentIds, 'main.sections', 
            'La seccion se actualizo con exito.', () => { vm.submitting = false; });
    }

    function search (term) {
        let results = filterFilter(vm.students, { AccountId: term });

        if (results.length === 0)
            results = filterFilter(vm.students, { Name: term });

        return results;
    }

    function addStudent () {
        if (vm.selectedStudents.indexOf(vm.selectedStudent) >= 0) return;
        
        vm.selectedStudents.push(vm.selectedStudent);
    }

}

module.exports = { name: 'EditSectionController', ctrl: EditSectionController };