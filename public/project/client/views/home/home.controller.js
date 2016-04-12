(function() {
    angular
        .module("CoLabApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, ProjectService, UserService, $rootScope, $routeParams) {
        var vm = this;
        vm.getUserOfMessage = getUserOfMessage;
        vm.me = $rootScope.cUser._id;
        var socket = io();
        vm.projectId = $routeParams.projectId;

        socket.emit('join project', vm.projectId);
        socket.on('chat message'+vm.projectId, function (message) {
            vm.messages.push(message);
            $scope.$apply();
        });

        function init() {
            ProjectService.findProjectById(vm.projectId)
                .then(renderProject);
        }

        init();

        function renderProject(response) {
            vm.project = response.data;
            vm.messages = vm.project.messages;
            vm.tasks = vm.project.tasks;
            getUsers();


        }


        function getUsers() {
            UserService.findUsersByProjectId(vm.project._id)
            .then(function (response) {
                vm.users = response.data;
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