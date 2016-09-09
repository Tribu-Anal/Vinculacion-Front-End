NewSectionController.$inject = [ 'TbUtils', 'sections', 'classes', 
                                 'professors', 'students', '$rootScope', 'filterFilter' ];

function NewSectionController (TbUtils, sections, classes, professors, students, rs, filterFilter) {

    const vm = this;

    vm.formTitle = 'Nueva Seccion';

    vm.section = {
        Code: '',
        ClassId: undefined,
        ProffesorAccountId: rs.Role === 'Professor' ? rs.ProfessorDBId : ''
    };
    vm.classes = [];
    vm.professors = [];
    vm.students = [];

    vm.selectedStudents = [];
    vm.tableSchema = require('../../../table-schemas/form-students-table-schema');

    vm.submit = submit;
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

    function submit () {
        vm.submitting = true;

        sections.post(vm.section, assignStudents, 
            resp => { TbUtils.showErrorMessage(resp.data); vm.submitting = false; });
    }

    function assignStudents (resp) {
        const studentIds = vm.selectedStudents.map(obj => obj.AccountId);

        TbUtils.assignAndGoTo(sections.assignStudents, resp.data.Id, studentIds, 'main.sections', 
            'La seccion se creo con exito.', () => { vm.submitting = false; });
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

module.exports = { name: 'NewSectionController', ctrl: NewSectionController };