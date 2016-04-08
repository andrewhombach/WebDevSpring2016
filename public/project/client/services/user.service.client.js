(function () {
    angular
        .module("CoLabApp")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {
        var api = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            getProfile: getProfile,
            setCurrentUser: setCurrentUser,
            findUsersByProjectId: findUsersByProjectId,
            findUsersByTaskId: findUsersByTaskId,
            getCurrentUser: getCurrentUser
        };

        return api;

        function findUserById (userId) {
            console.log("user.service.client.js got:" + userId);
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsername (username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials (username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function findAllUsers () {
            return $http.get("/api/user");
        }

        function deleteUserById (userId) {
            return $http.delete("/api/user/" + userId);
        }

        function createUser (user) {
            return $http.post("/api/user", user);
        }

        function updateUser (user) {
            console.log(user);
            return $http.put("/api/user/", user);
        }

        function findUsersByProjectId(projectId) {
            return $http.get("/api/project/" + projectId + "/user");
        }

        function findUsersByTaskId(id) {
            return $http.get("/api/task/" + id + "/user");
        }

        function getCurrentUser() {
            return $http.get("/api/loggedin");
        }

        function getProfile() {
            return $rootScope.cUser;
        }

        function setCurrentUser(user) {
            $rootScope.cUser = user;
        }
    }
})();