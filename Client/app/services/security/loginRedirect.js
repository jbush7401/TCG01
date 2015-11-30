(function (module) {

    var loginRedirect = function ($q, $location, $injector) {

        var lastPath = "/";

        var responseError = function (response) {
            if (response.status == 401) {
                lastPath = $location.path();
                $injector.get("oauth").logoff();
                $location.path("/");
            }
            return $q.reject(response);
        };

        var redirectPostLogin = function() {
            $location.path(lastPath);
            lastPath = "/";
        };

        return {
            responseError: responseError,
            redirectPostLogin: redirectPostLogin
        };
    };

    module.factory("loginRedirect", loginRedirect);
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push("loginRedirect");
    });

}(angular.module("TCGApp")));