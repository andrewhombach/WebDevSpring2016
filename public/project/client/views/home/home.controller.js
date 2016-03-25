(function() {
    angular
        .module("CoLabApp")
        .controller("HomeController", HomeController);

    function HomeController(ProjectService, MessageService, UserService, TaskService, $rootScope) {
        var vm = this;

        vm.me = $rootScope.cUser._id;

        function init() {
            ProjectService.findProjectById(456)
                .then(renderProject);
        }

        init();

        function renderProject(response) {
            vm.project = response.data;
            console.log(vm.project);
            getMessages();

        }

        function getMessages() {
            MessageService.findMessagesByProjectId(vm.project._id)
            .then(function (response) {
                vm.messages = response.data;
                console.log(response.data);
            })

        }

        function isMe(userId) {
            console.log(userId);
            return userId == $rootScope.cUser._id;
        }

    }
})();