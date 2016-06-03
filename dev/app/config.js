"use strict";

let setupRoutes = require("./routes");

config.$inject = [ '$stateProvider', '$urlRouterProvider' ];

function config ($stateProvider, $urlRouterProvider) {
	setupRoutes($stateProvider, $urlRouterProvider);
}

module.exports = config;