(function(){
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['register', 'TbUtils'];

    function RegisterController (register, TbUtils) {
        var vm = this;

        vm.email = "";
        vm.password = "";
        vm.accountId = "";
        vm.name = "";
        vm.campus = "SPS";
        vm.career = "I - 01 (Ing. en Sistemas Computacionales)";
        vm.registerStudent = registerStudent;
        vm.validate = validate;
        
        function registerStudent() {        
            register.registerStudent(setupJSON(), registerStudentSuccess, registerStudentFail);
        }
        
        function setupJSON() {
            return JSON.stringify (
                    {
                        AccountId: vm.accountId,
                        Name: vm.name,
                        Password: vm.password,
                        MajorId : vm.career.substring(0, 6),
                        Campus: vm.campus,
                        Email: vm.email,
                    });
        };
        
        function registerStudentSuccess(response) {
            TbUtils.displayNotification('success', 'Revisa tu Correo',
                                        'Se le ha enviado un correo de confirmacion. Porfavor revisar.');
        };
        
        function registerStudentFail() {
            TbUtils.displayNotification('error', 'Error', 'Se ha producido un error! Lamentamos los inconvenientes.');
        };
        
        function validate ($event) { 
            let regex = new RegExp("[a-z]|[0-9]|[A-Z]");
        
            let key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
       
            if (!regex.test(key)) {
                $event.preventDefault();
                return false;
            }  
        }
    }
})();