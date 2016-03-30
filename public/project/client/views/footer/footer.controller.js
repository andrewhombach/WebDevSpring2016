(function () {
    angular
        .module("CoLabApp")
        .controller("FooterController", FooterController);

    function FooterController ($rootScope, $location, MessageService, $route) {
        var vm = this;
        vm.message = null;
        vm.sendMessage = sendMessage;

        function sendMessage(message) {
            console.log("sendMessageCalled");
            MessageService.createMessage(message, $rootScope.cUser._id, $rootScope.projectId)
            .then(function (response) {
                console.log(response.data);
                $location.path('/home/' + $rootScope.projectId);
                $route.reload();
            });
        }


    }
})();