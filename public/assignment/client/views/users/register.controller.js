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
                    if (response.data){
                        $rootScope.cUser = response.data;
                        console.log($rootScope.cUser);
                        $location.url("/profile");
                    }

                }, function (response) {
                    console.log("Failed Registration.")
                });

        }
    }
})();