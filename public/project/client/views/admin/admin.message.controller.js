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
            var callback = function (response) {
                $scope.messages = response;
                console.log(response);
            };
            MessageService.findAllMessagesByUserId($rootScope.cUser._id, callback)
        }

        init();

        function seeAllMessages() {
            var callback = function (response) {
                $scope.messages = response;
                console.log(response)
            };
            MessageService.findAllMessages(callback);
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
            MessageService.deleteMessageById(message._id, retrieveMessages);
        }

        function addMessage(message) {
            MessageService.createMessage(message, retrieveMessages);
        }

        function updateMessage(message) {
            MessageService.updateMessage(message._id, message, retrieveMessages);
            $scope.message = null;
        }

        function selectMessage(pIndex) {
            $scope.message = $scope.messages[pIndex];
        }
    }
})();