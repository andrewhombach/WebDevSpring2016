(function () {
    angular
        .module("CoLabApp")
        .controller("FooterController", FooterController);

    function FooterController ($routeParams, UserService, MessageService, $location) {
        var vm = this;
        vm.message = null;
        vm.sendMessage = sendMessage;
        var socket = io.connect('ws://webdev2016-hombachandrew.rhcloud.com:8000');

        function sendMessage(message) {
            var m = {userId: UserService.getProfile()._id, text: message};

            var chat = null;

            if ($routeParams.projectId) {
                chat = $routeParams.projectId;
                MessageService
                    .createMessageForProject($routeParams.projectId, m)
                    .then(
                        function (response) {
                            socket.emit('chat message', chat,
                                {
                                    userId: UserService.getProfile()._id,
                                    text: message,
                                    createDate: (new Date).getTime()
                                });
                            vm.message = null;
                            if ($location.path().toString().includes(0, '/home')) {
                                console.log('changing');
                                $location.path('/home/' + $routeParams.projectId);
                            }
                        });
            }
            if ($routeParams.dmId) {
                chat = $routeParams.dmId;
                MessageService
                    .createMessageForDM($routeParams.dmId, m)
                    .then(
                        function (response) {
                            socket.emit('chat message', chat,
                                {
                                    userId: UserService.getProfile()._id,
                                    text: message,
                                    createDate: (new Date).getTime()
                                });
                            vm.message = null;
                        });
            }

        }
    }
})();