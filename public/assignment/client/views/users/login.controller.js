"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;

        vm.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response)
                    {
                        if (response.data) {
                            console.log(response.data);
                            UserService.setCurrentUser(response.data);
                            $location.path("/profile");
                        }
                    }, function (response)
                {
                    console.log("failed to login");
                }
                );
        }

    }
})();

