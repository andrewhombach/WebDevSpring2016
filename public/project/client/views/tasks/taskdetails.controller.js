(function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskDetailsController", TaskDetailsController);

    function TaskDetailsController(TaskService, UserService, ProjectService, $rootScope, $routeParams) {
        var vm = this;
        vm.taskId = $routeParams.taskId;

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


    }
})();

