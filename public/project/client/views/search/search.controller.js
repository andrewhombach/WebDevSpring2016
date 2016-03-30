(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location, SearchService) {
        $scope.searchTerm = $location.search().query.toString();

        function renderResults(results) {
            $scope.projects = results.projects;
            $scope.tasks = results.tasks;
            $scope.messages = results.messages;

        }

        function search(searchTerm) {
            SearchService.search(searchTerm)
                .then(function (response) {
                    $scope.results = response.data;
                    renderResults($scope.results);
                });
        }

        search($scope.searchTerm);

    }
})();