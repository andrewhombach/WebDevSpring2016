(function() {
    angular
        .module("CoLabApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location, $scope) {
        $scope.register = register;

        function register(user) {
            UserService
                .register(user)
                .then(function (response) {
                    $rootScope.cUser = response.data;
                    $location.url("/profile");

                });
        }
    }
})();