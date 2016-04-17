( function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskEditController", TaskEditController);

    function TaskEditController(UserService, TaskService, $routeParams, $location, $scope, $window) {
        var vm = this;
        vm.updateTask = updateTask;
        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.taskId = $routeParams.taskId;
        vm.projectId = $routeParams.projectId;
        vm.chatHeight = window.innerHeight;

        var w = angular.element($window);

        w.bind('resize', function() {
            vm.chatHeight = window.innerHeight;
            $scope.$apply();
        });

        function init() {
            TaskService.findTaskById(vm.taskId)
                .then(function (response) {
                    vm.task = response.data;
                    vm.userIds = vm.task.userIds;
                });
            getUsers();
        }

        init();

        function getUsers() {
            UserService.findUsersByTaskId(vm.taskId)
                .then(function (response) {
                    if (response.data) {
                        vm.users = response.data;
                    }
                });
        }

        function updateTask(task) {
            console.log("this is the task before update");
            console.log(task);
            TaskService.updateTask(task, vm.projectId)
                .then(function (response) {
                    $location.path("/project/" + vm.projectId + "/taskdetails/" + vm.taskId);
                });
        }

        function addUser(username) {
            UserService.findUserByUsername(username)
                .then(
                    function (response) {
                        if (!response.data) {
                            return;
                        }

                        if (!vm.users) {
                            vm.users = [];
                            vm.users[0] = response.data;
                        }

                        else {
                            vm.users.push(response.data);
                        }
                        vm.task.userIds = vm.users.map(function (u) {return u._id});
                    });
        }

        function removeUser(user) {
            for (var u in vm.task.userIds) {
                if (vm.task.userIds[u] === user._id) {
                    vm.task.userIds.splice(u, 1);
                }
            }
            for (var u in vm.users) {
                if (vm.users[u]._id === user._id) {
                    vm.users.splice(u, 1);
                }
            }
        }

    }

})();