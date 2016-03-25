(function () {
    angular
        .module("CoLabApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(UserService, $rootScope, $scope) {
        $scope.deleteUser = deleteUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;


        function init() {
            var callback = function (response) {
                $scope.users = response;
                console.log(response);
            };
            UserService.findAllUsers(callback)
        }

        init();

        function deleteUser(user) {
            UserService.deleteUserById(user._id, init);
        }

        function addUser(user) {
            UserService.createUser(user, init);
        }

        function updateUser(user) {
            UserService.updateUser(user._id,user, init);
            $scope.user = null;
        }

        function selectUser(uIndex) {
            $scope.user = $scope.users[uIndex];
        }
    }
})();