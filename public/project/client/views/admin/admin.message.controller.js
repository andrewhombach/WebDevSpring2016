(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("AdminMessageController", AdminMessageController);

    function AdminMessageController(MessageService) {
        var vm = this;
        
        vm.messageDictionary = null;
        vm.messages = null;
        vm.message = null;

        vm.deleteMessage = deleteMessage;
        vm.addMessage = addMessage;
        vm.updateMessage = updateMessage;
        vm.selectMessage = selectMessage;

        function init() {

            MessageService
                .findAllMessages()
                .then(function (response) {
                    console.log(response.data);
                    vm.messages = [];
                    for (var x in response.data) {
                        vm.messages = vm.messages.concat(response.data[x].messages);
                    }
                    console.log(vm.messages);
                    vm.messageDictionary = response.data;
                    vm.message = null
                });
        }

        init();

        function deleteMessage(message) {
            MessageService.deleteMessageById(messageProjectLookup(message), message._id)
                .then(init);
        }

        function addMessage(message) {
            MessageService.createMessageForProject(message.projectId, message)
                .then(init);
        }

        function updateMessage(message) {
            MessageService.updateMessage(messageProjectLookup(message), message)
                .then(init);
            vm.message = null;
        }

        function selectMessage(pIndex) {
            vm.message = vm.messages[pIndex];
        }

        function messageProjectLookup(message) {
            for (var d in vm.messageDictionary) {
                for (var t in vm.messageDictionary[d].messages) {
                    if (vm.messageDictionary[d].messages[t]._id == message._id) {
                        return vm.messageDictionary[d]._id;
                    }
                }
            }
        }
    }
})();