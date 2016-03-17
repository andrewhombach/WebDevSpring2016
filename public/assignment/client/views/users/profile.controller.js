"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($rootScope, UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            vm.user = UserService.getProfile();
            console.log("-----------");
            console.log(vm.user);
        }

        init();

        function update (user) {
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    UserService.findUserById(user._id)
                    .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        init();
                    });
                });
         }
    }
})();