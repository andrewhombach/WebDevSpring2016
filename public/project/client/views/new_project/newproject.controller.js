(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("NewProjectController", NewProjectController);

    function NewProjectController(ProjectService, UserService, $location, $rootScope) {
        var vm = this;
        vm.newProject = newProject;
        vm.usernames = [];
        vm.userIds = [];
        vm.addUser = addUser;
        vm.removeUser = removeUser;

        function newProject(project) {
            project.userIds = vm.userIds;
            project.admin = $rootScope.cUser._id;
            ProjectService.createProject(project)
                .then(function (response) {
                    var id = response.data._id;
                    $location.path("/projectdetails/" + id);
                });
        }

        function addUser(username) {
            UserService.findUserByUsername(username)
                .then(
                    function (response) {
                        console.log(response.data);
                        vm.usernames.push(response.data.username);
                        vm.userIds.push(response.data._id);
                    }
                );
        }

        function removeUser(username) {
            for (var u in vm.usernames) {
                if (vm.usernames[u] === username) {
                    vm.userIds.splice(u, 1);
                    vm.usernames.splice(u, 1);
                }
            }

        }

    }
})();