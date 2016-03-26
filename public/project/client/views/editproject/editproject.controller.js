(function () {
    angular
        .module("CoLabApp")
        .controller("EditProjectController", EditProjectController);

    function EditProjectController(ProjectService, UserService, TaskService, MessageService, $routeParams) {
        var vm = this;
        vm.projectId = $routeParams.projectId;

        function init() {
            ProjectService.findProjectById(vm.projectId)
            .then(function (response) {
                vm.project = response.data;
            });
            getUsers();
            getTasks();
        }

        init();

        function getUsers() {
            UserService.findUsersByProjectId(vm.projectId)
            .then(function (response) {
                vm.users = response.data;
            });
        }

        function getTasks() {
            TaskService.findTasksByProjectId(vm.projectId)
            .then(function (response) {
                vm.tasks = response.data;
            })
        }

    }
})();