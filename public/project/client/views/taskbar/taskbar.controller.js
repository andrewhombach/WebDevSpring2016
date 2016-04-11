(function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskBarController", TaskBarController);

    function TaskBarController($routeParams, TaskService) {
        var vm = this;
        vm.projectId = $routeParams.projectId;
        vm.tasks = null;

        function init() {
            TaskService.findTasksByProjectId($routeParams.projectId)
            .then(function (response) {
                console.log(response.data);
                vm.tasks = response.data;
            });
        }

        init();

    }
})();