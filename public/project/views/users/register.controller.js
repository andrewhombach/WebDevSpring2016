(function() {
    angular
        .module("CoLabApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location, $scope) {
        $scope.register = register;

        function register(user) {
            var callback = function (response) {
                $rootScope.cUser = response;
            };
            UserService.createUser(user, callback);
            console.log($rootScope.cUser);
            $location.url("/profile");
        }
    }
})();