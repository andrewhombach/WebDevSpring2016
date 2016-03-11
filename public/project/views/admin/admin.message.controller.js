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
        $scope.all = all;

        var all = true;

        function init() {
            var callback = function (response) {
                $scope.messages = response;
                console.log(response);
            };
            MessageService.findAllMessagesByUserId($rootScope.cUser._id, callback)
        }

        init();

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

        function seeAllMessages() {
            var callback = function (response) {
                $scope.messages = response;
                console.log(response)
            };
            MessageService.findAllMessages(callback);
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