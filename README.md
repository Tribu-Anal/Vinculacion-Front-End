# Manejo Horas de Vinculacion UNITEC
Aplicacion web para manejar las horas de trabajo social de los alumnos de UNITEC.

## Project Rules

### General

- One application component per file.
- Use of IIFE (Immediately Invoked Function Expression)
- Explicit functions over anonymous functions
- Use of anonymous functions only for success and error callbacks

### Angular

- No `var app = angular.module('app')`
- `var` for global variables, `let` for the rest of the scopes
- `.$inject` for dependencies
- `controller as` over `$scope`
- `controller as vm` and `var vm = this;`
- One controller per view
- DOM manipulation only inside directives
 

### File Naming

- Module: `app.module.js`, `app.config.js`, `app.run.js`, `app.constants.js`
- Controller: `home.controller.js`
- Service/Factory: `projects.service.js`
- Directive: `sidebar.directive.js`

### Angular Naming

- Controller: `HomeController` (Pascal case only)
- Service/Factory: `projects` (Camel case only)
- Directive: `sidebar` (Camel case only)

## Project Structure

![Project Structure 1](https://trello-attachments.s3.amazonaws.com/56e5216038ef94c55d9cb601/885x629/6e49dc59a25ac40eb37e09b8ae0da4e0/Screenshot_from_2016-03-14_00_00_32.png)
![Project Structure 2](https://trello-attachments.s3.amazonaws.com/56e5216038ef94c55d9cb601/755x329/f78a306792bee8b419188428fe3f11fa/Screenshot_from_2016-03-14_00_00_45.png)