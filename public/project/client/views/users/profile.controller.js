(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = UserService.getProfile();

        function update (user) {
            UserService
                .updateUser(user)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    console.log(response.data);
                });
         }
    }
})();