(function () {
    "use strict";

    var app = angular.module("TCGApp",
        [
        "common", "common.services", "ui.router"]);

    app.constant("RESOURCE_WEBAPI", "tcg01-env-WebAPI.elasticbeanstalk.com");
    app.config([
       "$stateProvider", "$urlRouterProvider", "$locationProvider",
       function ($stateProvider, $urlRouterProvider, $locationProvider) {
           $urlRouterProvider.otherwise("/");

           $stateProvider
               .state("main", {
                   url: "/",
                   controller: "mainController as vm",
                   templateUrl: "templates/splash.html"
               })

               .state("game", {
                   url: "/game",
                   controller: "gameController as vm",
                   templateUrl: "templates/game.html"
               })
       }
    ]);
}());