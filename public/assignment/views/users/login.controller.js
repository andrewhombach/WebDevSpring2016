(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope) {

        function login(username, password) {
            var user;
            var callback = function(response) {
                $scope.currentUser = response;
            };
            UserService.findUserByCredentials(username, password, callback);
        }

    }


})();