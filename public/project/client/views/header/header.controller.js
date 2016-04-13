(function () {
    angular
        .module("CoLabApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, $scope) {
        $scope.sidebarToggle = sidebarToggle;
        $scope.logout = logout;
        $scope.search = search;
        $scope.searchTerm = "";

        function sidebarToggle() {
            $rootScope.$broadcast('toggle');
        }

        function logout() {
            $rootScope.cUser = null;
        }

        function search(searchTerm){
            $location.path("/search");
            $location.search("query", searchTerm);
        }

    }
})();