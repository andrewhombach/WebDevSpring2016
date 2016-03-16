"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($rootScope, UserService) {
        var vm = this;

        vm.update = update;
        vm.user = $rootScope.cUser;

        function init() {
            UserService
                .getProfile();
        }

        return init();

        function update (user) {
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    $rootScope.cUser = response;
                });
         }
    }
})();