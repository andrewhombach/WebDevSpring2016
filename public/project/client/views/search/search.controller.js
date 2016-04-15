(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, SearchService, ProjectService) {
        var vm = this;

        vm.searchTerm = $location.search().query.toString();
        console.log(vm.searchTerm);
        vm.goToTask = goToTask;

        function renderResults(results) {
            console.log(results);
            vm.projects = results.projects;
            vm.tasks = results.tasks;
            vm.users = results.users;

        }

        function goToTask(task) {
            ProjectService
                .findProjectByTaskId(task._id)
                .then(
                    function (response) {
                        $location.path('/project/' + response.data._id + '/taskdetails/' + task._id);
                    }
                )
        }

        function search() {
            console.log(vm.searchTerm);
            SearchService.search(vm.searchTerm)
                .then(function (response) {
                    vm.results = response.data;
                    console.log(response);
                    renderResults(vm.results);
                });
        }

        search();

    }
})();