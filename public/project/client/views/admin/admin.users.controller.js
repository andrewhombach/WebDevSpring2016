(function () {
    angular
        .module("CoLabApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController(UserService) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.users;
        vm.user;

        function init() {
            UserService.findAllUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                    }
                )
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
            UserService.updateUser(user)
                .then(init);
        }

        function selectUser(uIndex) {
            vm.user = vm.users[uIndex];
        }
    }
})();