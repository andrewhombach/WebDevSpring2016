(function () {
    angular
        .module("CoLabApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(UserService, $rootScope, $scope) {
        $scope.deleteUser = deleteUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;

        function renderUsers(response) {
            $scope.users = response.data;
            $scope.user = null;
        }

        function init() {
            UserService.findAllUsers()
                .then(renderUsers)
        }

        init();

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(init);
        }

        function addUser(user) {
            UserService.createUser(user)
                .then(init);
        }

        function updateUser(user) {
            console.log(user);
            UserService.updateUser(user._id,user)
                .then(init);
        }

        function selectUser(uIndex) {
            $scope.user = $scope.users[uIndex];
        }
    }
})();