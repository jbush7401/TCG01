(function (module) {

    var oauth = function($http, $q,  formEncode, currentUser) {

        var login = function(username, password) {

            var config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }

            var data = formEncode({
                username: username,
                password: password
                //grant_type: "password"
            });

            return $http.post("http://localhost:8080/api/authenticate", data, config)
                .then(function(response) {
                    if (response.data.success) {
                        currentUser.setProfile(username, response.data.token);
                    }
                    else {
                        return { username: null, error: response.data.message}
                    }
                    return { username: username, error: null };
                });
        };

        var logoff = function() {
            currentUser.removeUser();
        };

        return {
            login: login,
            logoff: logoff
        }

    };
    module.factory("oauth", oauth);

}(angular.module("TCGApp")));