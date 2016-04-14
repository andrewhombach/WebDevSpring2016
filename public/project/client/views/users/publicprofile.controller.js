(function () {
    angular
        .module("CoLabApp")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController ($routeParams, UserService, DMService, $location, $window, $scope) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.directMessage = directMessage;
        vm.pageWidth = window.innerWidth < 1301 ? false : true;
        var w = angular.element($window);

        w.bind('resize', function() {
            if (window.innerWidth > 1300) {
                vm.pageWidth = true;
            }
            else {
                vm.pageWidth = false;
            }
            $scope.$apply();
        });

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