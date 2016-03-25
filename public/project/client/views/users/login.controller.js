(function(){
    angular
        .module("CoLabApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $scope, $location) {

        $scope.login = login;

        function login (username, password) {
            UserService.findUserByCredentials(username, password)
                .then(function (response) {
                    $rootScope.cUser = response.data;
                    $location.url("/profile");
                });
        }

    }
})();