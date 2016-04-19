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
            findUserById: findUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            getProfile: getProfile,
            setCurrentUser: setCurrentUser,
            adminCreateUser: adminCreateUser,
            adminFindAllUsers: adminFindAllUsers,
            adminFindUser: adminFindUser,
            adminDeleteUser: adminDeleteUser,
            adminUpdateUser: adminUpdateUser,
            logOut: logOut
        };

        return api;

        function logOut() {
            return $http.post("/api/assignment/logout");
        }

        function adminCreateUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function adminFindAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function adminFindUser(user) {
            return $http.get("/api/assignment/admin/user/" + user._id);
        }

        function adminUpdateUser(user) {
            return $http.put("/api/assignment/admin/user/" + user._id, user);
        }

        function adminDeleteUser(user) {
            return $http.delete("/api/assignment/admin/user/" + user._id);
        }

        function getCurrentUser() {
            return $rootScope.cUser;
        }

        function findUserById (userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials (username, password) {
            console.log(username + password);
            return $http.post("/api/assignment/login", {username: username, password: password});
        }

        function findAllUsers () {
            return $http.get("/api/assignments/user");
        }

        function deleteUserById (userId) {
           return $http.delete("/api/assignment/user/" + userId);
        }

        function createUser (user) {
            return $http.post("/api/assignment/register", user);
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