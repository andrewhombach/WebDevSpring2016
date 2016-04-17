(function () {
    angular
        .module("CoLabApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, UserService, Upload) {
        $scope.update = update;
        $scope.user = UserService.getProfile();
        var vm = this;
        vm.uploadPic = uploadPic;

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
                    console.log($scope.user);
                    $scope.update($scope.user);
                },
                function (response) {
                    console.log(response.data);

                }
            );
        }
    }
})() ;