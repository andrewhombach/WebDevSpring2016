(function () {
    angular
        .module("CoLabApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, $scope) {
        $scope.logout = logout;
        $scope.$location = $location;
        $scope.search = search;
        $scope.searchTerm = "";
        $rootScope.searchTerm = $scope.searchTerm;
        $scope.searchKey = searchKey;

        function logout() {
            $rootScope.cUser = null;
        }

        function search() {
            $location.path("/search");
        }

        function searchKey(searchKey) {
            $rootScope.searchTerm = searchKey;
        }
    }
})();