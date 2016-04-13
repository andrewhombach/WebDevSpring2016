(function() {
    angular
        .module("CoLabApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, ProjectService, UserService, $rootScope, $routeParams, $window) {
        var vm = this;
        vm.getUserOfMessage = getUserOfMessage;
        vm.me = $rootScope.cUser._id;
        var socket = io.connect('http://webdev2016-hombachandrew.rhcloud.com/:8000');
        vm.projectId = $routeParams.projectId;
        vm.chatHeight = window.innerHeight;
        var w = angular.element($window);

        w.bind('resize', function() {
            vm.chatHeight = window.innerHeight;
            console.log(window.innerWidth);
            $scope.$apply();
        });

        socket.emit('join chat', vm.projectId);
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

        function getUserOfMessage(userId) {
            for(var u in vm.users) {
                if (vm.users[u]._id === userId) {
                    return vm.users[u].username;
                }
            }
        }

    }
})();