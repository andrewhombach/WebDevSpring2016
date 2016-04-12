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
            vm.user = UserService.getCurrentUser();
            if (vm.user.emails) {
                vm.user.emails = vm.user.emails.toString();
            }
            if (vm.user.phones) {
                vm.user.phones = vm.user.phones.toString();

            }
            if (vm.user.roles) {
                vm.user.roles = vm.user.roles.toString();
            }
            console.log(vm.user);
            delete vm.user.password;
            console.log(vm.user);

        }

        init();

        function update (user) {
            if (user.phones) {
                user.phones = user.phones.split(",");
            }
            else {
                user.phones = [];
            }
            if (user.emails) {
                user.emails = user.emails.split(",");
            }
            else {
                user.emails = [];
            }
            if (user.roles) {
                user.roles = user.roles.split(",");
            }
            else {
                user.roles = [];
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