(function () {
    'use strict';

    angular
        .module('TCGApp')
        .controller('mainController', ['$location', 'oauth', 'currentUser', 'alerting', 'loginRedirect', mainController]);

    function mainController($location, oauth, currentUser, alerting, loginRedirect) {
        var vm = this;

        vm.testing = "Hello";

        vm.newGame = function () {
            $location.path('/game');
        };

        vm.username = "";
        vm.password = "";
        vm.user = currentUser.profile;

        vm.login = function (form) {
            if (form.$valid) {
                oauth.login(vm.username, vm.password)
                    .then(function(data){
                        if(data.username){
                            alerting.addInfo("Logged in successfully" + data.username)}
                        else {
                            alerting.addWarning(data.error)}})
                    .then(loginRedirect.redirectPreLogin);
                vm.password = "";
            }
        };

        vm.logoff = function () {
            oauth.logoff();
        };

        vm.signOut = function() {
            oauth.logout();
        };


        //CardResource.get({id: 31}, function (data) {
        //    vm.card = data.data;
        //});
    }
})();
