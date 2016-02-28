var app = angular.module('VinculacionApp');

app.controller('RegistroCtrl', ['registro', function(registro) {
    var controlador = this;
    
    controlador.correo;
    controlador.password;
    controlador.numCuenta;
    controlador.nombre;
    controlador.campus;
    controlador.idCarrera;
    controlador.carrera;
    
    controlador.registrarAlumno = function() {
        registro.registroAlumno(JSON.stringify({
            IdNumber: controlador.numCuenta,
            Name: controlador.nombre,
            Password: controlador.password,
            Campus: controlador.campus,
            Email: controlador.correo,
            Major: {
                MajorId : controlador.idCarrera,
                Name: controlador.carrera
            }
    })).success(function(response) {
            console.log(response);
            console.log("Alumno registrado");
        })
        console.log("Registrado");
    }
}]);