(function () {
    "use strict";

    function entriesResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/card/:id", {cardId:"@id"});
    }

    angular
        .module("common.services")
        .factory("CardResource",
                ["$resource",
                 "appSettings",
                    entriesResource]);
}());