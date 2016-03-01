(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $scope, $location) {

        $scope.login = login;

        function login (username, password) {

            var callback = function (response) {
                if (response) {
                    $rootScope.cUser = response;
                    console.log("successfully loged in the following user:" + $rootScope.cUser);
                    $location.url("/profile");
                }
            };
            UserService.findUserByCredentials(username, password, callback);
        }

    }
})();