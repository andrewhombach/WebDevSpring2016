(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $location, ProjectService, DMService, UserService) {
        var vm = this;

        //had to hardcode the user because I haven't implemented sessions for this assignment yet. The sidebar fails on load because no
        //one is logged in. It can load dynamically.

        function init() {

            ProjectService.findAllProjectsByUserId("570723779a6cf3c5105af9b9")
            .then(function (response) {
                vm.projects = response.data;
                console.log(vm.projects);

            });

            DMService.findAllDMsByUserId("570723779a6cf3c5105af9b9")
            .then(function (response) {
                vm.dms = response.data;
                for (var d in vm.dms) {
                    if (vm.dms[d].user1 == 234) {
                        UserService.findUserById(vm.dms[d].user2)
                        .then(function (response) {
                            vm.dms[d].name = response.data.username;
                        })
                    }
                    else {
                        UserService.findUserById(vm.dms[d].user1)
                        .then(function (response) {
                            vm.dms[d].name = response.data.username;
                        })

                    }
                }
            });
        }

        init();


    }
})();


