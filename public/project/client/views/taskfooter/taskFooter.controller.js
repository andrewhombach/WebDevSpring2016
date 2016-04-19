(function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("TaskFooterController", TaskFooterController);

    function TaskFooterController(TaskService, $routeParams, $location) {

        var vm = this;
        vm.createTask = createTask;
        vm.name = null;

        function createTask(name) {
            TaskService
                .createTask({name: name}, $routeParams.projectId)
                .then(
                    function (response) {
                        $location.path("/project/" + $routeParams.projectId + "/taskdetails/" + response.data._id);
                    }
                );

        }

    }
})();