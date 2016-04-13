(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(ProjectService, DMService, UserService, $scope, $window) {
        var vm = this;

        vm.showSidebar = window.innerWidth < 768 ? false : true;
        vm.toggle = toggle;

        var w = angular.element($window);

        w.bind('resize', function() {

            if (window.innerWidth < 768) {
                console.log(window.innerWidth);
                vm.showSidebar = false;
            }
            else {
                vm.showSidebar = true;
            }
        });

        $scope.$on('toggle', vm.toggle);

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

        function toggle() {
            vm.showSidebar = !vm.showSidebar;
            console.log(vm.showSidebar);
        }
    }
})();


