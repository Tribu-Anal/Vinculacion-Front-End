module.exports = {

	addStudentModal: {
        templateUrl: 'templates/components/main/section/dialogs/' +
            'add-student/add-student.html',
        controller: 'AddStudentController'
    },

    editSectionModal: {
        templateUrl: 'templates/components/main/section/dialogs/' +
            'edit-section/edit-section.html',
        controller: 'EditSectionController as vm'
    }
    
};