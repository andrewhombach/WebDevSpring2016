"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $scope, $location) {

        $scope.login = login;

        function login(username, password) {
            console.log(username + " " + password);
            UserService.findUserByCredentials(username, password)
                .then(function (response)
                    {
                        if (response.data) {
                            $rootScope.cUser = response.data;
                            console.log(response.data);
                            console.log("successfully logged in the following user:" + $rootScope.cUser.firstName);
                            //$location.url("/profile");
                        }
                    }, function (response)
                {
                    console.log("failed to login");
                }
                )
        }

    }
})();

