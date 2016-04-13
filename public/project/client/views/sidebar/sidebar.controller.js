(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(ProjectService, DMService, UserService) {
        var vm = this;

        var userId = UserService.getProfile()._id;

        function init() {

            ProjectService.findAllProjectsByUserId(userId)
            .then(function (response) {
                vm.projects = response.data;
                console.log(vm.projects);

            });

            DMService.findAllDMsByUserId(userId)
            .then(function (response) {
                vm.dms = response.data;
                for (var d in vm.dms) {
                    if (vm.dms[d].user1 == userId) {
                        UserService.findUserById(vm.dms[d].user2)
                        .then(function (response) {
                            vm.dms[d].name = response.data.firstName + " " + response.data.lastName;
                        })
                    }
                    else {
                        UserService.findUserById(vm.dms[d].user1)
                        .then(function (response) {
                            vm.dms[d].name = response.data.firstName + " " + response.data.lastName;
                        })

                    }
                }
            });
        }

        init();


    }
})();


