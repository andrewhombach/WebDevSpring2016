(function () {
    angular
        .module("CoLabApp")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController ($routeParams, UserService, DMService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.directMessage = directMessage;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    }
                );
        }

        init();

        function directMessage() {
            DMService
                .createDM({user1: vm.userId, user2: UserService.getProfile()._id})
                .then(
                    function (response) {
                        $location.path('/directmessage/' + response.data._id)
                    }
                )
        }

    }
})();