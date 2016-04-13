(function () {
    angular
        .module("CoLabApp")
        .controller("EditProjectController", EditProjectController);

    function EditProjectController(ProjectService, UserService, TaskService, $routeParams, $location) {
        var vm = this;
        vm.projectId = $routeParams.projectId;
        vm.updateProject = updateProject;
        vm.deleteTask = deleteTask;
        vm.removeUser = removeUser;

        function init() {
            ProjectService
                .findProjectById(vm.projectId)
                .then(
                    function (response) {
                        vm.project = response.data;
                    });
            getUsers();
            getTasks();
        }

        init();

        function getUsers() {
            UserService
                .findUsersByProjectId(vm.projectId)
                .then(
                    function (response) {
                        vm.users = response.data;
                    });
        }

        function getTasks() {
            TaskService
                .findTasksByProjectId(vm.projectId)
                .then(function (response) {
                vm.tasks = response.data;
            })
        }

        function updateProject(project) {
            ProjectService
                .updateProject(project)
                .then(function (response) {
                $location.path("/projectdetails/" + vm.projectId);
            });
        }

        function deleteTask(task) {
            TaskService.deleteTaskById(task._id, vm.projectId).then(init);
        }

        function removeUser(user) {
            for (var u in vm.users) {
                if (vm.users[u]._id === user._id) {
                    vm.users.splice(u, 1);
                    vm.project.userIds.splice(u, 1);
                }
            }
        }



    }
})();