var messages = require("./message.mock.json");
module.exports = function(uuid) {
    var api = {
        createMessage: createMessage,
        deleteMessage: deleteMessage,
        findMessage: findMessage,
        updateMessage: updateMessage,
        findMessagesByUserId: findMessagesByUserId
    };

    return api;

    function createMessage(message) {
        message._id = uuid.v1();
        messages.push(message);
        return messages;
    }

    function deleteMessage(messageId){
        for (var d in messages) {
            if (messages[d]._id === messageId) {
                messages.splice(d, 1);
            }
        }
        return messages;
    }

    function updateMessage(message, messageId) {
        for (var d in messages) {
            if (messages[d]._id === messageId) {
                messages[d] = message;
            }
        }
        return messages;
    }

    function findMessage(messageId) {
        for (var d in messages) {
            if (messages[d]._id === messageId) {
                return messages[d];
            }
        }
    }

    function findMessagesByUserId(userId) {
        var returnMessages = [];
        for (var d in messages) {
            if (messages[d].user1 === userId || messages[d].user2 === userId) {
                returnMessages.push(messages[d]);
            }
        }
        return returnMessages;
    }
};