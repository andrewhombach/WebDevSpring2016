( function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskEditController", TaskEditController);

    function TaskEditController(UserService, TaskService, $routeParams, $location) {
        var vm = this;
        vm.updateTask = updateTask;

        vm.taskId = $routeParams.taskId;
        vm.projectId = $routeParams.projectId;

        function init() {
            TaskService.findTaskById(vm.projectId, vm.taskId)
            .then(function (response) {
                vm.task = response.data;
            });
            getUsers();
        }

        init();

        function getUsers() {
            UserService.findUsersByTaskId(vm.taskId)
            .then(function (response) {
                vm.users = response.data;
            });
        }

        function updateTask(taskId, task) {
            TaskService.updateTask(taskId, task)
            .then(function (response) {
                $location.path("/project/" + vm.projectId + "/taskdetails/" + vm.taskId);
            });
        }

    }
})();