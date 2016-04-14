(function () {
    angular
        .module("CoLabApp")
        .controller("PublicProfileBarController", PublicProfileBarController);

    function PublicProfileBarController(ProjectService, $routeParams, UserService) {
        var vm = this;
        vm.joinProject = joinProject;
        var userId = $routeParams.userId;

        function init() {
            ProjectService.findAllProjectsByUserId(userId)
                .then(function (response) {
                    vm.projects = response.data;
                });
        }

        function joinProject(projectId) {
            ProjectService.findProjectById(projectId)
                .then(function (response) {
                    var tempProject = response.data;

                    if (tempProject.userIds) {
                        tempProject.userIds.push(UserService.getProfile()._id)
                    }

                    ProjectService.updateProject(tempProject)
                        .then(init);
                });
        }

        init();

    }
})();