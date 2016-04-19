(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, UserService, $location) {
        var vm = this;
        vm.sidebarToggle = sidebarToggle;
        vm.logout = logout;
        vm.search = search;
        vm.searchTerm = "";

        function sidebarToggle() {
            $rootScope.$broadcast('toggle');
        }

        function logout() {
            UserService.logOut();
        }

        function search(searchTerm){
            $location.path("/search");
            $location.search("query", searchTerm);
        }

    }
})();