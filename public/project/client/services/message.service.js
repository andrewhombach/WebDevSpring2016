(function () {
    angular
        .module("CoLabApp")
        .factory("MessageService", MessageService);


    function MessageService($http) {
        var api = {
            createMessageForProject: createMessageForProject,
            createMessageForDM: createMessageForDM,
            deleteMessageById: deleteMessageById,
            findAllMessagesByUserId: findAllMessagesByUserId,
            findMessageById: findMessageById,
            updateMessage: updateMessage,
            findAllMessages: findAllMessages,
            findMessagesByProjectId: findMessagesByProjectId,
            findMessagesByDMId: findMessagesByDMId
        };

        return api;

        function findMessageById(id) {
            return $http.get("/api/message/" + id);
        }

        function findAllMessagesByUserId(userId) {
            return $http.get("/api/user/" + userId + "/message");
        }

        function deleteMessageById(projectId, messageId) {
            return $http.delete("/api/project/" + projectId + "/message/" + messageId);
        }

        function findAllMessages() {
            return $http.get("/api/message");
        }

        function createMessageForProject(projectId, message) {
            return $http.post("/api/project/"+ projectId + "/message/", message);
        }

        function createMessageForDM(dmId, message) {
            return $http.post("/api/dm/" + dmId + "/message", message)
        }

        function updateMessage(projectId, message) {
            return $http.put("/api/project/" + projectId + "/message/", message);
        }

        function findMessagesByProjectId(id) {
            return $http.get("/api/project/" + id + "/message");
        }

        function findMessagesByDMId(id) {
            return $http.get("/api/dm/" + id + "/message");
        }

    }
})();