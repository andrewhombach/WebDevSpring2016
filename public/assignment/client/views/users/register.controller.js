"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {
        var vm = this;

        vm.register = register;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
            .then(function (response) {
                console.log(response.data);
                $rootScope.cUser = response.data;
                $location.url("/profile");
            });
        }

        function register(user) {
            UserService.createUser(user)
                .then(function (response) {
                    console.log(response.data);
                    login(user);
                }
                , function (response) {
                    console.log("Failed Registration.")
                });

        }
    }
})();