(function(){
    angular
        .module("CoLabApp")
        .controller("LoginController", LoginController);

    function LoginController($window, UserService, $scope, $location) {
        var vm = this;
        vm.login = login;

        function login (username, password) {
            UserService.findUserByCredentials(username, password)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();