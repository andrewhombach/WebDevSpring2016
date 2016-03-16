"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $scope, $location) {
        var vm = this;

        vm.login = login;

        function login(user) {
            console.log(user.username + " " + user.password);
            UserService.findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function (response)
                    {
                        if (response.data) {
                            $rootScope.cUser = response.data;
                            console.log(response.data);
                            console.log("successfully logged in the following user:" + $rootScope.cUser.firstName);
                            $location.url("/profile");
                        }
                    }, function (response)
                {
                    console.log("failed to login");
                }
                );
        }

    }
})();

