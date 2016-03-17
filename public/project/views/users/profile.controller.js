(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.cUser;

        function update (user) {
            var callback = function (response) {
                $rootScope.cUser = response;
            };
            UserService.updateUser(user._id, user, callback);
            console.log($rootScope.cUser);
         }
    }
})();