"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController (UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    vm.user = response.data;
                    console.log(vm.user);
                });
        }

        init();

        function update (user) {
            user.phones = user.phones.split(",");
            user.emails = user.emails.split(",");
            UserService.updateUser(user._id, user)
                .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        init();
                });
         }
    }
})();