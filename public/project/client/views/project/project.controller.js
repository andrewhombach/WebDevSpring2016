(function() {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("ProjectController", ProjectController);

    function ProjectController(ProjectService, UserService, $routeParams) {
        var vm = this;

        vm.projectId = $routeParams.projectId;

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


    }
})();