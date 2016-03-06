var app = angular.module('VinculacionApp');

app.controller('RegistroCtrl', ['registro', 'toaster', function(registro, toaster) {
    var controlador = this;

    controlador.correo;
    controlador.password;
    //controlador.confirm_password;
    controlador.numCuenta;
    controlador.nombre;
    controlador.campus = "SPS";
    //controlador.idCarrera = "I-1";
    controlador.carrera = "I - 01 (Ing. en Sistemas Computacionales)";
    
    controlador.registrarAlumno = function() {
        //console.log("Registrado");
        console.log(JSON.stringify({
            AccountId: controlador.numCuenta,
            Name: controlador.nombre,
            Password: controlador.password,
            MajorId : controlador.carrera.substring(0, 6),//Agarrar solo los primeros tres caracteres, Ej: I - 01
            Campus: controlador.campus,
            Email: controlador.correo,
    }));
        
        registro.registroAlumno(JSON.stringify({
            AccountId: controlador.numCuenta,
            Name: controlador.nombre,
            Password: controlador.password,
            MajorId : controlador.carrera.substring(0, 6),//Agarrar solo los primeros tres caracteres, Ej: I - 01
            Campus: controlador.campus,
            Email: controlador.correo,
    })).success(function(response) {
            console.log(response);
            console.log("Alumno registrado");
            toaster.pop({type: 'success', title: 'Revisa tu Correo', body: 'Se le ha enviado un correo de confirmacion. Porfavor revisar.'});
        })
        .error(function() {
            toaster.pop({type: 'error', title: 'Error', body: 'Se ha producido un error! Lamentamos los inconvenientes.'});
            console.log("Error");
        })
    };
    
    //Credits to Alex Cross - StackOverflow
    controlador.validar = function($event) { 
        var regex = new RegExp("[a-z]|[0-9]|[A-Z]");
    
        var key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
   
        if (!regex.test(key)) {
        $event.preventDefault();
        return false;
        }  
    };
}]);