"use strict";

config.$inject = ['$stateProvider'];

function config($stateProvider) {

    $stateProvider
        .state('main.student-project-pdf', {
            templateUrl: "templates/components/main/" +
                "student-project-pdf/student-project-pdf.html",
            controller: 'StudentProjectPdfController as vm',
            onEnter: onStateEnter,
            url: '/proyecto-reporte-de-horas-alumno',
            params: {
                data: null
            }
        });
}

let onStateEnter = ['$rootScope',
    function(rootScope) {
        rootScope.viewTitle = "Vinculacion | PDF de Horas Alumno";
        rootScope.viewStyles = "main student-project-pdf";
    }
];

module.exports = config;