global.jQuery = require("jquery");
global.$ = global.jQuery;

require("angular");
require("angular-animate");
require("angular-cookies");
require("angular-material");
require("angular-modal-service");
require("angular-spinkit");
require("angular-ui-router");
require("checklist-model");
require("../assets/lib/angular-ui-form-validation/angular-ui-form-validation");
require("angularjs-toaster");
require("bootstrap");
require("../assets/lib/jquery-validate/jquery-validate");
require("../assets/lib/jquery-validate/additional-methods");
require("../assets/lib/kQuery/landing");

const app = require("./app.module");

angular.bootstrap(document, [ app ]);