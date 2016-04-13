(function () {
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

        init();

        function deleteMessage(message) {
            MessageService.deleteMessageById(messageProjectLookup(message), message._id)
                .then(retrieveMessages);
        }

        function addMessage(message) {
            MessageService.createMessageForProject(message.projectId, message)
                .then(retrieveMessages);
        }

        function updateMessage(message) {
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