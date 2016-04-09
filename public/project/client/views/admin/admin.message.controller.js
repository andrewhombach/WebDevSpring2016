(function () {
    angular
        .module("CoLabApp")
        .controller("AdminMessageController", AdminMessageController);

    function AdminMessageController(MessageService, $rootScope) {
        var vm = this;
        
        vm.messageDictionary = null;
        vm.messages = null;
        vm.message = null;

        vm.deleteMessage = deleteMessage;
        vm.addMessage = addMessage;
        vm.updateMessage = updateMessage;
        vm.selectMessage = selectMessage;
        vm.changePicker = changePicker;

        var all = true;

        function init() {
            MessageService.findAllMessagesByUserId($rootScope.cUser._id)
                .then(function (response) {
                    vm.messages = [];
                    for (x in response.data) {
                        vm.messages = vm.messages.concat(response.data[x].messages);
                    }
                    console.log(vm.messages);
                    vm.messageDictionary = response.data;
                    vm.message = null
                });
        }

        function seeAllMessages() {

            MessageService.findAllMessages()
                .then(function (response) {
                    console.log(response.data);
                    vm.messages = [];
                    for (x in response.data) {
                        vm.messages = vm.messages.concat(response.data[x].messages);
                    }
                    console.log(vm.messages);
                    vm.messageDictionary = response.data;
                    vm.message = null
                });
        }

        seeAllMessages();

        function retrieveMessages (){
            if (all) {
                seeAllMessages();
            }
            else {
                init();
            }
        }

        function changePicker() {
            if (!all) {
                all = false;
                seeAllMessages();
            }
            else {
                all = true;
                init();
            }
        }

        function deleteMessage(message) {
            MessageService.deleteMessageById(messageProjectLookup(message), message._id)
                .then(retrieveMessages);
        }

        function addMessage(message) {
            console.log(message);
            MessageService.createMessageForProject(message.projectId, message)
                .then(retrieveMessages);
        }

        function updateMessage(message) {
            console.log(messageProjectLookup(message));
            MessageService.updateMessage(messageProjectLookup(message), message)
                .then(retrieveMessages);
            vm.message = null;
        }

        function selectMessage(pIndex) {
            vm.message = vm.messages[pIndex];
        }

        function messageProjectLookup(message) {
            for (d in vm.messageDictionary) {
                console.log(vm.messageDictionary[d]);
                for (t in vm.messageDictionary[d].messages) {
                    if (vm.messageDictionary[d].messages[t]._id == message._id) {
                        return vm.messageDictionary[d]._id;
                    }
                }
            }
        }
    }
})();