(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileBarController", ProfileBarController);

    function ProfileBarController(ProjectService, TaskService, UserService, $location) {
        var vm = this;
        vm.leaveProject = leaveProject;
        var userId = UserService.getProfile()._id;
        vm.taskDetails = taskDetails;

        function init() {
            ProjectService.findAllProjectsByUserId(userId)
            .then(function (response) {
                vm.projects = response.data;

            });
            TaskService.findAllTasksByUserId(userId)
                .then(function (response) {
                    vm.tasks = response.data;
                });

        }
        init();

        function taskDetails(taskId) {
            ProjectService
                .findProjectByTaskId(taskId)
                .then(
                    function (response) {
                        console.log(response.data._id);
                        console.log(response.data);
                        var id = response.data._id;
                        $location.path('/project/' + id + '/taskdetails/'  + taskId)
                    }
                );
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




    }
})();