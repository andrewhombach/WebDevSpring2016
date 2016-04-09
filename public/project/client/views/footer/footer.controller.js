(function () {
    angular
        .module("CoLabApp")
        .controller("FooterController", FooterController);

    function FooterController ($routeParams, $location, UserService, MessageService, $route) {
        var vm = this;
        vm.message = null;
        vm.sendMessage = sendMessage;

        function sendMessage(message) {
            var m = {userId : UserService.getProfile()._id, text: message};
            MessageService.createMessageForProject($routeParams.projectId, m)
            .then(function (response) {
                $location.path('/home/' + $routeParams.projectId);
                $route.reload();
            });
        }


    }
})();