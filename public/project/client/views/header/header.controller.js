(function () {
    angular
        .module("CoLabApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, $scope, SearchService) {
        $scope.logout = logout;
        $scope.$location = $location;
        $scope.search = search;
        $scope.searchTerm = "";
        $rootScope.searchTerm = $scope.searchTerm;

        function logout() {
            $rootScope.cUser = null;
        }

        function search(searchTerm){
            $rootScope.searchTerm = searchTerm;
            $location.path("/search");
            $location.search("query", searchTerm);
            console.log($location.search());
        }

    }
})();