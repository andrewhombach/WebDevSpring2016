(function() {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("ProjectController", ProjectController);

    function ProjectController(ProjectService, MessageService, UserService, TaskService, $rootScope, $routeParams) {
        var vm = this;

        vm.getUserOfMessage = getUserOfMessage;

        vm.me = $rootScope.cUser._id;

        vm.projectId = $routeParams.projectId;

        function init() {
            ProjectService.findProjectById(vm.projectId)
                .then(renderProject);
        }

        init();

        function renderProject(response) {
            $rootScope.projectId = vm.projectId;
            vm.project = response.data;
            getMessages(project.messages);
            getTasks(project.tasks);
            getUsers(project.userIds);
        }

        function getMessages(messages) {
            MessageService.findMessagesByIds(messages)
                .then(function (response) {
                    vm.messages = response.data;
                    console.log(response.data);
                });
        }

        function getUsers(users) {
            UserService.findUsersByIds(users)
                .then(function (response) {
                    vm.users = response.data;
                    console.log(response.data);
                });
        }

        function getTasks(tasks) {
            TaskService.findTasksByProjectId(tasks)
                .then(function (response) {
                    vm.tasks = response.data;
                    console.log(response.data);
                });
        }

        function isMe(userId) {
            console.log(userId);
            return userId == $rootScope.cUser._id;
        }

        function getUserOfMessage(userId) {
            for(u in vm.users) {
                if (vm.users[u]._id == userId) {
                    return vm.users[u].username;
                }
            }
        }

    }
})();