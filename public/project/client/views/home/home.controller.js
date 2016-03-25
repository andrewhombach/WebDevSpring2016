(function() {
    angular
        .module("CoLabApp")
        .controller("HomeController", HomeController);

    function HomeController(ProjectService, MessagesService, UserService, TaskService) {
        var vm = this;

        function init() {
            ProjectService.findProjectById(456)
                .then(renderProject);
        }

        function renderProject(response) {
            vm.project = response.data;
            console.log(vm.project);


        }
    }
})();