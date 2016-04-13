(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileBarController", ProfileBarController);

    function ProfileBarController(ProjectService, TaskService, UserService) {
        var vm = this;
        vm.leaveProject = leaveProject;
        var userId = UserService.getProfile()._id

        function init() {
            ProjectService.findAllProjectsByUserId(userId)
            .then(function (response) {
                vm.projects = response.data;
                TaskService.findAllTasksByUserId(userId)
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
                    if (tempProject.userIds[u] === userId) {
                        tempProject.userIds.splice(1, u);
                    }
                }
                ProjectService.updateProject(tempProject)
                .then(init);
            });

        }

        init();

    }
})();