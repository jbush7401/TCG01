(function () {
    "use strict";

    angular
        .module("common", [])
        .constant("appSettings",
        {
            serverPath: "http://localhost:8080"
            // serverPath: "http://tcg01-env-WebAPI.elasticbeanstalk.com:8080"
        });
}());
