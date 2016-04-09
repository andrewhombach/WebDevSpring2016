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

        function deleteTaskById (taskId, projectId) {
            return $http.delete("/api/project/" + projectId + "/task/" + taskId);
        }

        function findAllTasks () {
            return $http.get("/api/task");
        }

        function createTask (task, projectId) {
            return $http.post("/api/project/" + projectId + "/task/", task)
        }

        function updateTask (task, projectId) {
            return $http.put("/api/project/" + projectId + "/task/", task);
        }

        function findTasksByProjectId(projectId) {
            return $http.get("/api/project/" + projectId + "/task");
        }


    }
})();