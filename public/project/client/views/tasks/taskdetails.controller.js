(function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskDetailsController", TaskDetailsController);

    function TaskDetailsController(TaskService, UserService, $routeParams, $location, $window, $scope, $sce) {
        var vm = this;
        vm.taskId = $routeParams.taskId;
        vm.projectId = $routeParams.projectId;
        vm.editTask = editTask;
        vm.chatHeight = window.innerHeight;

        var w = angular.element($window);

        w.bind('resize', function() {
            vm.chatHeight = window.innerHeight;
            $scope.$apply();
        });

        function init() {
            TaskService
                .findTaskById(vm.taskId)
                .then(function (response) {
                    vm.task = response.data;
                    var c = new Date(vm.task.createDate);
                    var d = new Date(vm.task.dueDate);
                    vm.createDate = c.getMonth() + "/" + c.getDate() + "/" + (c.getYear() + 1900);
                    vm.dueDate = d.getMonth() + "/" + d.getDate() + "/" + (d.getYear() + 1900);
                    if (vm.task.location) {
                        vm.gMap = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCasNgXTgj-TVaIt6N5GizuoeF7KQMv9VU&q=" + vm.task.location.replace(" ", "+").replace(",", "+"));
                    }
                });
            getUsers();
        }

        init();

        function getUsers() {
            UserService
                .findUsersByTaskId(vm.taskId)
            .then(function (response) {
                vm.users = response.data;
            });
        }

        function editTask() {
            $location.path("/project/" + vm.projectId + "/taskedit/" + vm.taskId);
        }
    }
})();

