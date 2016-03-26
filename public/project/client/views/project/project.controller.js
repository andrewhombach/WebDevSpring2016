(function() {
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
            console.log(vm.project);
            getMessages();
            getTasks();
            getUsers();
        }

        function getMessages() {
            MessageService.findMessagesByProjectId(vm.project._id)
                .then(function (response) {
                    vm.messages = response.data;
                    console.log(response.data);
                });
        }

        function getUsers() {
            UserService.findUsersByProjectId(vm.project._id)
                .then(function (response) {
                    vm.users = response.data;
                    console.log(response.data);
                });
        }

        function getTasks() {
            TaskService.findTasksByProjectId(vm.project._id)
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