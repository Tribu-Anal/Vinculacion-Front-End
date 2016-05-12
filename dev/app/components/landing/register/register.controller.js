(function(){
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['register', 'majors', 'TbUtils'];

    function RegisterController (register, majors, TbUtils) {
        var vm = this;
        
        vm.majors = [];
        vm.student = {
            Email: "",
            Password: "",
            AccountId: "",
            Name: "",
            Campus: "SPS",
            MajorId: ""
        };
        
        majors.getMajors(getMajorsSuccess, getMajorsFail);
        
        vm.registerStudent = registerStudent;
        vm.validate = validate;
        
        function registerStudent() {        
            register.registerStudent(vm.student, registerStudentSuccess, registerStudentFail);
        }
        
        function registerStudentSuccess(response) {
            TbUtils.displayNotification('success', 'Revisa tu Correo',
                                        'Se le ha enviado un correo de confirmacion. Porfavor revisar.');
        }
        
        function registerStudentFail() {
            TbUtils.displayNotification('error', 'Error', 'Se ha producido un error! Lamentamos los inconvenientes.');
        }
        
        function validate ($event) { 
            let regex = new RegExp("[a-z]|[0-9]|[A-Z]");
        
            let key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
       
            if (!regex.test(key)) {
                $event.preventDefault();
                return false;
            }  
        }
        
        function getMajorsSuccess(response) {
            TbUtils.fillList(response, vm.majors);
            vm.student.MajorId = vm.majors[0].MajorId;
        }
        
        function getMajorsFail(response) {
            console.log(response);
            TbUtils.displayNotification('error', 'Error',
                                       'No se ha podido obtener todas las carreras disponibles.');
        }
    }
})();