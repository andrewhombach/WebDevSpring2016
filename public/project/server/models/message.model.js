var q = require('q');

module.exports = function(uuid, ProjectModel, DMModel, mongoose, db) {

    var MessageSchema = require("./message.schema.server.js")(mongoose);
    var MessageModel = mongoose.model('Message', MessageSchema);


    var api = {
        createMessage: createMessage,
        deleteMessage: deleteMessage,
        findMessage: findMessage,
        updateMessage: updateMessage,
        findMessagesByUserId: findMessagesByUserId,
        findAllMessages: findAllMessages,
        searchMessages: searchMessages,
        findMessagesByIds: findMessagesByIds
    };

    return api;

    function findAllMessages() {

        var deferred = q.defer();

        MessageModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createMessage(message) {
        var newMessage = {
            userId: message.userId,
            text: message.text,
            createDate: (new Date).getTime()
        };

        var deferred = q.defer();

        MessageModel.create(newMessage, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteMessage(messageId){
        var deferred = q.defer();

        MessageModel.remove({_id : messageId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateMessage(message) {
        var deferred = q.defer();

        MessageModel.findByIdAndUpdate(message._id, {$set:message}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findMessage(messageId) {
        var deferred = q.defer();

        MessageModel.findById(messageId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findMessagesByUserId(userId) {
        var deferred = q.defer();

        MessageModel.find({userId: {$in: [userId]}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function searchMessages(term) {
        if (term.length == 0) {
            return null;
        }
        var results = [];
        for (var t in messages) {
            var searchLength = messages[t].text.length - term.length;
            for (i = 0; i <= searchLength; i++) {
                if (messages[t].text.substring(0 + i, term.length + i).toLowerCase() == term.toLowerCase()) {
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


    function findMessagesByIds(messageIds) {

        var deferred = q.defer();

        MessageModel.find({_id : {$in : messageIds}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};