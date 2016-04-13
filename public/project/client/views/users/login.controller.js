(function(){
    angular
        .module("CoLabApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login (username, password) {
            UserService.login(username, password)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();