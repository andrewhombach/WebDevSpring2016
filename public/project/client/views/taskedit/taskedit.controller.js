( function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskEditController", TaskEditController);

    function TaskEditController(UserService, TaskService, $routeParams, $location) {
        var vm = this;
        vm.updateTask = updateTask;
        vm.users = null;
        vm.task = null;
        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.taskId = $routeParams.taskId;
        vm.projectId = $routeParams.projectId;

        function init() {
            TaskService.findTaskById(vm.taskId)
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

        function updateTask(task) {
            TaskService.updateTask(task, vm.projectId)
                .then(function (response) {
                    $location.path("/project/" + vm.projectId + "/taskdetails/" + vm.taskId);
                });
        }

        function addUser(username) {
            UserService.findUserByUsername(username)
                .then(
                    function (response) {
                        console.log(response);
                        vm.users.push(response.data);
                        vm.task.userIds.push(response.data._id)
                    }
                );

        }

        function removeUser(user) {
            for (var u in vm.task.userIds) {
                if (vm.task.userIds[u] == user._id) {
                    vm.task.userIds.splice(u, 1);
                }
            }
            for (var u in vm.users) {
                if (vm.users[u]._id == user._id) {
                    vm.users.splice(u, 1);
                }
            }
        }

    }

})();