(function () {
    angular
        .module("CoLabApp")
        .controller("DirectMessageController", DirectMessageController);

    function DirectMessageController(DMService, MessageService, UserService, TaskService, $rootScope, $routeParams) {
        var vm = this;

        vm.me = $rootScope.cUser._id;
        vm.getUsername = getUsername;
        vm.notMe = notMe;
        vm.dmId = $routeParams.dmId;

        function init() {
            DMService.findDMById(vm.dmId)
                .then(renderDM);
        }

        init();

        function renderDM(response) {
            vm.dm = response.data;
            console.log(vm.dm);
            getMessages();
            getUsers(vm.dm.user1, vm.dm.user2);

        }

        function getMessages() {
            MessageService.findMessagesByDMId(vm.dm._id)
                .then(function (response) {
                    vm.messages = response.data;
                    console.log(response.data);
                });

        }

        function getUsers(user1, user2) {
            UserService.findUserById(user1)
                .then(function (response) {
                    vm.user1 = response.data;
                    console.log(response.data);
                    UserService.findUserById(user2)
                    .then(function (response) {
                        vm.user2 = response.data;
                        console.log(response.data);
                    });
                });
        }


        function notMe() {
            if (vm.user1._id == $rootScope.cUser._id) {
                return vm.user2;
            }
            else {
                return vm.user1;
            }
        }

        function getUsername(id) {
            if (id == vm.user1._id) {
                return vm.user1.username;
            }
            else {
                return vm.user2.username;
            }
        }

    }
})();