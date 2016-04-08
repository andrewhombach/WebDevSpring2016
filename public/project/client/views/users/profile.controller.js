(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.cUser;

        function update (user) {
            UserService.updateUser(user)
                .then(function (response) {
                    $rootScope.cUser = response.data;
                    console.log(response.data);
                });
         }
    }
})();