"use strict";
(function () {
    angular
        .module("CoLabApp")
        .factory("TaskService", TaskService);

    function TaskService($http) {
        var api = {
            createTask: createTask,
            deleteTaskById: deleteTaskById,
            findAllTasksByUserId: findAllTasksByUserId,
            findTaskById: findTaskById,
            updateTask: updateTask,
            findAllTasks: findAllTasks,
            findTasksByProjectId: findTasksByProjectId
        };

        return api;

        function findTaskById (id) {
            return $http.get("/api/task/" + id)
        }

        function findAllTasksByUserId (userId) {
            return $http.get("/api/user/" + userId + "/task")
        }

        function deleteTaskById (taskId) {
            return $http.delete("/api/task/" + taskId);
        }

        function findAllTasks () {
            return $http.get("/api/task");
        }

        function createTask (task) {
            return $http.post("/api/task/", task)
        }

        function updateTask (taskId, task) {
            return $http.put("/api/task/" + taskId, task);
        }

        function findTasksByProjectId(projectId) {
            return $http.get("/api/project/" + projectId + "/task");
        }
    }
})();