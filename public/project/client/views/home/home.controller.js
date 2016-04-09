(function() {
    angular
        .module("CoLabApp")
        .controller("HomeController", HomeController);

    function HomeController(ProjectService, MessageService, UserService, TaskService, $rootScope, $routeParams) {
        var vm = this;

        vm.getUserOfMessage = getUserOfMessage;

        vm.me = $rootScope.cUser._id;
        console.log(vm.me);

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
            vm.messages = vm.project.messages;
            vm.tasks = vm.project.tasks;
            getUsers();
        }


        function getUsers() {
            UserService.findUsersByProjectId(vm.project._id)
            .then(function (response) {
                vm.users = response.data;
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