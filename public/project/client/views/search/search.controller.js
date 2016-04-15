(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, SearchService, ProjectService) {
        var vm = this;

        vm.searchTerm = $location.search().query.toString();
        vm.goToTask = goToTask;

        function renderResults(results) {
            vm.projects = results.projects;
            vm.tasks = results.tasks;
            vm.users = results.users;

            vm.showUsers = vm.users.length !== 0;
            vm.showProjects = vm.projects.length !== 0;
            vm.showTasks = vm.tasks.length !== 0;

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