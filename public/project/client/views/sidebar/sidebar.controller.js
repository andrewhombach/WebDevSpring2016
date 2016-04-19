(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(ProjectService, DMService, UserService, $scope, $window, $routeParams) {
        var vm = this;

        vm.active = active();

        vm.showSidebar = window.innerWidth < 768 ? false : true;
        vm.toggle = toggle;
        vm.getName = getName;

        var w = angular.element($window);

        w.bind('resize', function() {

            if (window.innerWidth < 768) {
                vm.showSidebar = false;
            }
            else {
                vm.showSidebar = true;
            }
            $scope.$apply();
        });

        $scope.$on('toggle', vm.toggle);

        var userId = UserService.getProfile()._id;

        function init() {

            ProjectService
                .findAllProjectsByUserId(userId)
                .then(function (response) {
                    vm.projects = response.data;
                });

            DMService
                .findAllDMsByUserId(userId)
                .then(function (response) {
                    vm.dms = response.data;
                    var tempArray = [];
                    for (var v in vm.dms) {
                        tempArray.push(vm.dms[v]._id);
                    }

                    UserService.findUsersByDmIds(tempArray)
                        .then(
                            function (users) {
                                vm.users = users.data;
                            },
                            function (err) {
                            });
            });
        }

        init();

        function toggle() {
            vm.showSidebar = !vm.showSidebar;
        }

        function active() {
            if ($routeParams.projectId) {
                return $routeParams.projectId;
            }
            if ($routeParams.dmId) {
                return $routeParams.dmId;
            }

            return null;
        }

        function getName(dm) {
            var u = null;
            if (dm.user1 === userId) {
                u = dm.user2;
            }
            else {
                u = dm.user1;
            }

            for (var x in vm.users) {
                if (vm.users[x]._id == u) {
                    return vm.users[x].firstName + " " + vm.users[x].lastName;
                }
            }
            return null;
        }


    }
})();


