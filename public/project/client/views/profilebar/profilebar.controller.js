(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileBarController", ProfileBarController);

    function ProfileBarController(ProjectService, TaskService, $rootScope) {
        var vm = this;
        vm.leaveProject = leaveProject;

        function init() {
            ProjectService.findAllProjectsByUserId($rootScope.cUser._id)
            .then(function (response) {
                vm.projects = response.data;
                TaskService.findAllTasksByUserId($rootScope.cUser._id)
                .then(function (response) {
                    vm.tasks = response.data;
                });
            });
        }

        function leaveProject(projectId) {
            ProjectService.findProjectById(projectId)
            .then(function (response) {
                var tempProject = response.data;
                for (var u in tempProject.userIds) {
                    if (tempProject.userIds[u] == $rootScope.cUser._id) {
                        tempProject.userIds.splice(1, u);
                    }
                }
                ProjectService.updateProject(tempProject._id, tempProject)
                .then(init);
            });

        }

        init();

    }
})();