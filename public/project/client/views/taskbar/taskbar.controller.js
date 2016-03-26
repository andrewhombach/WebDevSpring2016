(function () {
    angular
        .module("CoLabApp")
        .controller("TaskBarController", TaskBarController);

    function TaskBarController($rootScope, TaskService) {
        var vm = this;

        function init() {
            TaskService.findTasksByProjectId($rootScope.projectId)
            .then(function (response) {
                vm.tasks = response.data;
            });
        }

        init();

    }
})();