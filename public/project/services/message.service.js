(function () {
    angular
        .module("CoLabApp")
        .factory("MessageService", MessageService);

    function MessageService() {
        var model = {
            messages: [
                {
                    "_id": 111, "userId": 123, "text": "hey! whats up!"
                },
                {
                    "_id": 323, "userId": 123, "text": "What what!"
                },
                {
                    "_id": 444, "userId": 234, "text": "Lets make this call happen soon"
                }
            ],
            createMessage: createMessage,
            deleteMessageById: deleteMessageById,
            findAllMessagesByUserId: findAllMessagesByUserId,
            findMessageById: findMessageById,
            updateMessage: updateMessage,
            findAllMessages: findAllMessages
        };

        return model;

        function findMessageById (id, callback) {
            var messages = model.messages;
            for (var m in messages) {
                if (messages[m]._id == id) {
                    callback(model.messages[m]);
                }
            }
        }

        function findAllMessagesByUserId (userId, callback) {
            var messages = model.messages;
            var userMessages = [];
            for (var m in messages) {
                if (messages[m].userId == userId) {
                    userMessages.push(messages[m]);
                }
            }
            callback(userMessages)
        }

        function deleteMessageById (messageId, callback) {
            var messages = model.messages;
            for (var m in messages) {
                if (messages[m]._id === messageId) {
                    messages.splice(m, 1);
                    callback(model.messages);
                }
            }
        }

        function findAllMessages (callback) {
            callback(model.messages);
        }

        function createMessage (message, callback) {
            var newMessage = {
                _id: message._id,
                userId: message.userId,
                text: message.text
            };
            model.messages.push(newMessage);
            callback(model.messages);

        }

        function updateMessage (messageId, message, callback) {
            var messages = model.messages;
            for (var m in messages) {
                if (messages[m]._id === messageId) {
                    messages[m] = message;
                    callback(model.messages[m]);
                }
            }
        }
    }
})();