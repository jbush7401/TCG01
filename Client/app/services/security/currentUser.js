(function(module) {
   
    var currentUser = function(localStorage){

        var USERKEY = "jbushtoken";

        var setProfile = function (username, token) {
            profile.username = username;
            profile.token = token;
            localStorage.add(USERKEY, profile);
        };

        var isInRole = function (roleCheck) {
            if (profile.roles)
                if (profile.roles.indexOf(roleCheck) > -1)
                    return true;
                else {
                    return false;
                }
            else return "No Roles Defined";
        };

        var initialize = function () {
            var user = {
                username: "",
                token: "",
                roles: "",
                get loggedIn() {
                    return this.token;
                }
            };

            var localUser = localStorage.get(USERKEY);
            if (localUser) {
                user.username = localUser.username;
                user.token = localUser.token;
                user.roles = localUser.roles;
            }
            return user;
        };

        var removeUser = function () {
            localStorage.remove(USERKEY);
            profile.username = "";
            profile.token = "";
            profile.roles = [];
        }

        var profile = initialize();
        
        return {
            setProfile: setProfile,
            profile: profile,
            removeUser: removeUser,
            isInRole: isInRole
        };
    };

    module.factory("currentUser", currentUser);

}(angular.module("TCGApp")));