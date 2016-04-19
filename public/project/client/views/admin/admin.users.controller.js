(function () {
    "use strict";
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
        vm.password = null;

        function init() {
            UserService.findAllUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                        vm.user = null;
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
            user.password = vm.user.password;
            if (vm.password) {
                user.password = vm.password;
            }
            vm.user = null;
            vm.password = null;
            UserService
                .updateUser(user)
                .then(init);
        }

        function selectUser(uIndex) {
            vm.user = vm.users[uIndex];

        }
    }
})();