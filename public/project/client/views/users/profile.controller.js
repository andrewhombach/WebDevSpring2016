(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, UserService, Upload, $route) {

        var vm = this;
        vm.update = update;
        vm.user = UserService.getProfile();
        vm.uploadPic = uploadPic;

        function init() {
            UserService
                .findUserById(vm.user._id)
                .then(
                    function (response) {
                        vm.user = response.data;
                        vm.profPic = vm.user.pic;
                        vm.password = vm.user.password;
                        delete vm.user.password;

                    }
                )
        }

        init();

        function update (user) {
            if (!user.password) {
                user.password = vm.password;
            }

            UserService
                .updateUser(user)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    init();
                });
         }

        function uploadPic(pic) {
            Upload.upload({
                url: '/api/profile/pic',
                data: {file: pic}
            }).then(
                function (response) {
                    vm.user.pic = response.data;
                    vm.update(vm.user);
                },
                function (response) {
                }
            );
        }
    }
})() ;