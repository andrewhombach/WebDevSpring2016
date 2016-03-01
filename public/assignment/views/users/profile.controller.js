(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $rootScope, UserService) {
        $scope.update = update;

        function update (user) {
            var callback = function (response) {
                $rootScope.cUser = response;
            };
            UserService.updateUser(user._id, user, callback);
            console.log($rootScope.cUser);
         }

    }

})();