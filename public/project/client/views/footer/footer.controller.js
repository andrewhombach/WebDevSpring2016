(function () {
    angular
        .module("CoLabApp")
        .controller("FooterController", FooterController);

    function FooterController ($routeParams, UserService, MessageService) {
        var vm = this;
        vm.message = null;
        vm.sendMessage = sendMessage;
        var socket = io();

        function sendMessage(message) {
            var m = {userId: UserService.getProfile()._id, text: message};
            MessageService.createMessageForProject($routeParams.projectId, m)
                .then(function (response) {
                    console.log(response.data);
                    socket.emit('chat message', $routeParams.projectId,
                    {
                        userId: UserService.getProfile()._id,
                        text: message,
                        createDate: (new Date).getTime()
                    });
                    vm.message = null;
                });
        }
    }
})();