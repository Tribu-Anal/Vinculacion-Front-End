var app = angular.module('VinculacionApp');

app.controller('RegistroCtrl', ['registro', function(registro) {
    var controlador = this;

    controlador.correo;
    controlador.password;
    //controlador.confirm_password;
    controlador.numCuenta;
    controlador.nombre;
    controlador.campus = "SPS";
    //controlador.idCarrera = "I-1";
    controlador.carrera = "I-1 (Ing. en Sistemas Computacionales)";
    
    controlador.registrarAlumno = function() {
        registro.registroAlumno(JSON.stringify({
            IdNumber: controlador.numCuenta,
            Name: controlador.nombre,
            Password: controlador.password,
            Campus: controlador.campus,
            Email: controlador.correo,
            MajorId : controlador.carrera.substring(0, 4)//Agarrar solo los primeros tres caracteres, Ej: I-1
    })).success(function(response) {
            console.log(response);
            console.log("Alumno registrado");
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