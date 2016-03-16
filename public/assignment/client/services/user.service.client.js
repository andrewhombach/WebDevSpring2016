"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser
        };

        return api;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials (username, password) {
            console.log("Trying to log in " + username + "with password: " + password);
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers () {
            return $http.get ("/api/assignments/user");
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
    }
})();