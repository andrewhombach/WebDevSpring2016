(function () {
    angular
        .module("CoLabApp")
        .controller("AdminMessageController", AdminMessageController);

    function AdminMessageController(MessageService, $rootScope, $scope) {
        $scope.deleteMessage = deleteMessage;
        $scope.addMessage = addMessage;
        $scope.updateMessage = updateMessage;
        $scope.selectMessage = selectMessage;
        $scope.changePicker = changePicker;

        var all = true;

        function init() {
            MessageService.findAllMessagesByUserId($rootScope.cUser._id)
                .then(function (response) {
                    $scope.messages = response.data;
                    $scope.message = null
                })
        }

        init();

        function seeAllMessages() {

            MessageService.findAllMessages()
                .then(function (response) {
                    $scope.messages = response.data;
                    $scope.message = null;
                });
        }

        function retrieveMessages (){
            if (!all) {
                seeAllMessages();
            }
            else {
                init();
            }
        }

        function changePicker() {
            if (all) {
                all = false;
                seeAllMessages();
            }
            else {
                all = true;
                init();
            }
        }

        function deleteMessage(message) {
            MessageService.deleteMessageById(message._id)
                .then(retrieveMessages);
        }

        function addMessage(message) {
            MessageService.createMessage(message)
                .then(retrieveMessages);
        }

        function updateMessage(message) {
            MessageService.updateMessage(message)
                .then(retrieveMessages);
            $scope.message = null;
        }

        function selectMessage(pIndex) {
            $scope.message = $scope.messages[pIndex];
        }
    }
})();