(function () {
    angular
        .module("CoLabApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location) {
        $scope.$location = $location.url();
        $scope.searchTerm = $rootScope.searchTerm;


    }
})();