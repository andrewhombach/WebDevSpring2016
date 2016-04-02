"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController (UserService, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    vm.user = response.data;
                    vm.user.emails = vm.user.emails.toString();
                    vm.user.phones = vm.user.phones.toString();
                    console.log(vm.user);
                });
        }

        init();

        function update (user) {
            if (user.phones.length > 0) {
                user.phones = user.phones.split(",");
            }
            else {
                user.phones = [];
            }
            if (user.emails.length > 0) {
                user.emails = user.emails.split(",");
            }
            else {
                user.emails = [];
            }
            UserService.updateUser(user._id, user)
                .then(function (response) {
                        init();
                });
         }

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(function (response) {
                    UserService.setCurrentUser(null);
                    $location.path('/home');
                }
                );

        }
    }
})();