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
            getCurrentUser: getCurrentUser,
            findUserByUsername: findUserByUsername,
            findUsersByDMId: findUsersByDMId,
            register: register,
            login: login,
            logOut: logOut
        };

        return api;

        function login(username, password) {
            var cred = {username: username, password: password};
            return $http.post("/api/login", cred);

        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logOut() {
            setCurrentUser(null);
            return $http.post("/api/logout");
        }

        function findUserById (userId) {
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
            return $http.put("/api/user/", user);
        }

        function findUsersByProjectId(projectId) {
            return $http.get("/api/project/" + projectId + "/user");
        }

        function findUsersByDMId(dmId) {
            return $http.get("/api/dm/" + dmId + "/user");
        }

        function findUsersByTaskId(taskId) {
            return $http.get("/api/task/" + taskId + "/user");
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