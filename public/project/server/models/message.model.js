var messages = require("./message.mock.json");
module.exports = function(uuid, ProjectModel) {
    var api = {
        createMessage: createMessage,
        deleteMessage: deleteMessage,
        findMessage: findMessage,
        updateMessage: updateMessage,
        findMessagesByUserId: findMessagesByUserId,
        findAllMessages: findAllMessages,
        searchMessages: searchMessages,
        findMessagesByProjectId: findMessagesByProjectId
    };

    return api;

    function findAllMessages() {
        return messages;
    }

    function createMessage(message) {
        message._id = uuid.v1();
        messages.push(message);
        return messages;
    }

    function deleteMessage(messageId){
        for (var d in messages) {
            if (messages[d]._id == messageId) {
                messages.splice(d, 1);
            }
        }
        return messages;
    }

    function updateMessage(message, messageId) {
        for (var d in messages) {
            if (messages[d]._id == messageId) {
                messages[d] = message;
            }
        }
        return messages;
    }

    function findMessage(messageId) {
        for (var d in messages) {
            if (messages[d]._id == messageId) {
                console.log(messages[d]);
                return messages[d];
            }
        }
    }

    function findMessagesByUserId(userId) {
        var returnMessages = [];
        for (var d in messages) {
            if (messages[d].userId == userId) {
                returnMessages.push(messages[d]);
            }
        }
        return returnMessages;
    }

    function searchMessages(term) {
        if (term.length == 0) {
            return null;
        }
        var results = [];
        for (var t in messages) {
            var searchLength = messages[t].text.length - term.length;
            for (i = 0; i < searchLength; i++) {
                if (messages[t].text.substring(0 + i, term.length + i) == term) {
                    results = addResult(messages[t], results);
                }
            }
        }
        return results;
    }

    function addResult(message, results) {
        results.push(message);
        return results;
    }

    function findMessagesByProjectId(id) {
        var returnMessages = [];
        var project = ProjectModel.findProject(id);
        for (p in project.messages) {
            for (m in messages){
                if (messages[m]._id == project.messages[p]) {
                    returnMessages.push(messages[m]);
                }
            }
        }
        return returnMessages;
    }

};