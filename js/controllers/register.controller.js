(function(){
    "use strict";

    angular
        .module('VinculacionApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['register', 'toaster'];

    function RegisterController (register, toaster) {
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
            register
                .registerStudent( JSON.stringify (
                {
                    AccountId: vm.accountId,
                    Name: vm.name,
                    Password: vm.password,
                    MajorId : vm.career.substring(0, 6),
                    Campus: vm.campus,
                    Email: vm.email,
                }))
                .success( function(response) {
                    toaster.pop(
                        {
                            type: 'success', 
                            title: 'Revisa tu Correo', 
                            body: 'Se le ha enviado un correo de confirmacion. Porfavor revisar.'
                        }
                    );
                })
                .error( function() {
                    toaster.pop(
                        {
                            type: 'error', 
                            title: 'Error', 
                            body: 'Se ha producido un error! Lamentamos los inconvenientes.'
                        }
                    );
                });
        }
        
        //Credits to Alex Cross - StackOverflow
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