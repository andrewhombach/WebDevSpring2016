(function () {
    angular
        .module("CoLabApp")
        .controller("FooterController", FooterController);

    function FooterController ($routeParams, UserService, MessageService) {
        var vm = this;
        vm.message = null;
        vm.sendMessage = sendMessage;
        var socket = io.connect('http://webdev2016-hombachandrew.rhcloud.com/:8000');
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