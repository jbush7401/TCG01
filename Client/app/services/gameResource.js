/**
 * Created by jbush_000 on 11/29/2015.
 */
(function () {
    "use strict";

    function entriesResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/game/:id", {cardId:"@id"});
    }

    angular
        .module("common.services")
        .factory("GameResource",
            ["$resource",
                "appSettings"]);
}());