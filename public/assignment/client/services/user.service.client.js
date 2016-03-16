"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            getProfile: getProfile,
            setCurrentUser: setCurrentUser

        };

        return api;

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials (cred) {
            console.log("Trying to log in " + cred.username + " with password: " + cred.password);
            return $http.get("/api/assignment/userCred/" + cred.username + "/" + cred.password);
        }

        function findAllUsers () {
            return $http.get("/api/assignments/user");
        }

        function deleteUserById (userId) {
           return $http.delete("/api/assignment/user/" + userId);
        }

        function createUser (user) {
            return $http.post("/api/assignment/user", user);
        }

        function updateUser (userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getProfile() {
            return $rootScope.cUser;
        }

        function setCurrentUser(user) {
            $rootScope.cUser = user;
        }
    }
})();