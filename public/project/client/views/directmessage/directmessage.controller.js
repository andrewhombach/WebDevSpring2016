(function () {
    angular
        .module("CoLabApp")
        .controller("DirectMessageController", DirectMessageController);

    function DirectMessageController(DMService, UserService, $routeParams, $scope, $window) {
        var vm = this;

        vm.me = UserService.getProfile()._id;
        vm.getUserOfMessage = getUserOfMessage;
        vm.dmId = $routeParams.dmId;
        var socket = io.connect('ws://webdev2016-hombachandrew.rhcloud.com/:8000');
        vm.chatHeight = window.innerHeight;
        var w = angular.element($window);

        w.bind('resize', function() {
            vm.chatHeight = window.innerHeight;
            console.log(window.innerWidth);
            $scope.$apply();
        });

        socket.emit('join chat', vm.dmId);
        socket.on('chat message' + vm.dmId, function (message) {
            vm.messages.push(message);
            $scope.$apply();
        });

        function init() {
            DMService.findDMById(vm.dmId)
                .then(renderDM);
        }

        init();

        function renderDM(response) {
            vm.dm = response.data;
            vm.messages = vm.dm.messages;
            console.log(vm.messages);
            getUsers();
        }

        function getUsers() {
            UserService.findUsersByDMId(vm.dmId)
                .then(function (response) {
                    vm.users = response.data;
                    vm.notMe = notMe();
                });
        }

        function getUserOfMessage(userId) {
            for(var u in vm.users) {
                if (vm.users[u]._id === userId) {
                    return vm.users[u].username;
                }
            }
        }

        function notMe() {
            if (vm.me === vm.users[0]._id) {
                return vm.users[1];
            }
            return vm.users[0];
        }

    }
})();