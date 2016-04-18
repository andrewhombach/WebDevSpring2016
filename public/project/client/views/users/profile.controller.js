(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, UserService, Upload, $route) {
        $scope.update = update;
        $scope.user = UserService.getProfile();

        var vm = this;
        vm.uploadPic = uploadPic;

        function init() {
            UserService
                .findUserById($scope.user._id)
                .then(
                    function (response) {
                        $scope.user = response.data;
                        vm.profPic = $scope.user.pic;
                        console.log(vm.profPic);

                    }
                )
        }

        init();

        function update (user) {
            UserService
                .updateUser(user)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    console.log(response.data);
                });
         }

        function uploadPic(pic) {
            Upload.upload({
                url: '/api/profile/pic',
                data: {file: pic}
            }).then(
                function (response) {
                    console.log(response.data);
                    $scope.user.pic = response.data;
                    $scope.update($scope.user);
                    $route.reload();
                },
                function (response) {
                }
            );
        }
    }
})() ;