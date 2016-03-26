(function () {
    angular
        .module("CoLabApp")
        .controller("NewProjectController", NewProjectController);

    function NewProjectController(ProjectService, $location, $rootScope) {
        var vm = this;
        vm.newProject = newProject;

        function newProject(project) {
            var userArray = project.userIds.split(",");
            project.userIds = userArray;
            project.admin = $rootScope.cUser;
            ProjectService.createProject(project)
            .then(function (response) {
                var id = response.data._id;
                console.log(response.data);
                $location.path("/projectdetails/" + id);
            });
        }



    }
})();