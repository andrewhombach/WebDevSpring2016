(function () {
    angular
        .module("CoLabApp")
        .factory("MessageService", MessageService);


    function MessageService($http) {
        var api = {
            createMessage: createMessage,
            deleteMessageById: deleteMessageById,
            findAllMessagesByUserId: findAllMessagesByUserId,
            findMessageById: findMessageById,
            updateMessage: updateMessage,
            findAllMessages: findAllMessages
        };

        return api;

        function findMessageById(id) {
            return $http.get("/api/message/" + id)
        }

        function findAllMessagesByUserId(userId) {
            return $http.get("/api/user/" + userId + "/message")
        }

        function deleteMessageById(messageId) {
            return $http.delete("/api/message/" + messageId);
        }

        function findAllMessages() {
            return $http.get("/api/message");
        }

        function createMessage(message) {
            return $http.post("/api/message/", message)
        }

        function updateMessage(messageId, message) {
            return $http.put("/api/message/" + messageId, message);
        }
    }
})();