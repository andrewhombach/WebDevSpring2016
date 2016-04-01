"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {
        var vm = this;

        vm.register = register;


        function register(user) {
            UserService.createUser(user)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    $location.path("/profile");
                }
                , function (response) {
                });
        }
    }
})();