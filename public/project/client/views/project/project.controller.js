(function() {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("ProjectController", ProjectController);

    function ProjectController(ProjectService, UserService, $routeParams) {
        var vm = this;

        vm.projectId = $routeParams.projectId;
        vm.showUsers = showUsers;

        function init() {
            ProjectService.findProjectById(vm.projectId)
                .then(renderProject);
        }

        init();

        function renderProject(response) {
            vm.project = response.data;
            vm.tasks = vm.project.tasks;
            getUsers();
        }

        function getUsers() {
            UserService.findUsersByProjectId(vm.projectId)
                .then(function (response) {
                    vm.users = response.data;
                    console.log(response.data);
                });
        }

        function showUsers(userIds) {
            var result = "";
            for (var id in userIds) {
                for (var u in vm.users) {
                    if (userIds[id] === vm.users[u]._id) {
                        result = result + vm.users[u].username + ",";
                    }
                }
            }
            console.log(userIds);
            console.log(result);

            return result.substring(0, result.length - 2);
        }


    }
})();