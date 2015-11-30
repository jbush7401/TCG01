/**
 * Created by jbush_000 on 11/24/2015.
 */
(function () {
    'use strict';

    angular
        .module('TCGApp')
        .controller('gameController', ['$location', mainController]);

    function mainController($location) {
        var vm = this;

        var gameObj = null;

        if(gameObj){

        } else
        {

        }
        //CardResource.get({id: 31}, function (data) {
        //    vm.card = data.data;
        //});
    }
})();