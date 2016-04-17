(function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskBarController", TaskBarController);

    function TaskBarController($routeParams, TaskService, $window, $scope) {
        var vm = this;
        vm.projectId = $routeParams.projectId;
        vm.tasks = null;
        vm.chatHeight = window.innerHeight;

        var w = angular.element($window);

        w.bind('resize', function() {
            vm.chatHeight = window.innerHeight;
            $scope.$apply();
        });

        function init() {
            TaskService.findTasksByProjectId($routeParams.projectId)
            .then(function (response) {
                vm.tasks = response.data;
            });
        }

        init();

    }
})();