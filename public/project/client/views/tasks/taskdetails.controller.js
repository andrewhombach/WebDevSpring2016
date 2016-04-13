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


        console.log(vm.chatHeight);

        var w = angular.element($window);

        w.bind('resize', function() {
            vm.chatHeight = window.innerHeight;
            $scope.$apply();
        });

        function init() {
            TaskService.findTaskById(vm.taskId)
            .then(function (response) {
                console.log(response.data);
                vm.task = response.data;

                vm.gMap = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCasNgXTgj-TVaIt6N5GizuoeF7KQMv9VU&q=" + vm.task.location.replace(" ", "+").replace(",","+"));

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

        function editTask() {
            console.log("/project/" + vm.projectId + "/taskedit/" + vm.taskId);
            $location.path("/project/" + vm.projectId + "/taskedit/" + vm.taskId);
        }






    }
})();

